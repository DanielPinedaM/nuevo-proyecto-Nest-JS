import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import fs from 'fs-extra';
import * as path from 'path';
import { DateTime } from 'luxon';
import { LoggerService } from '@/app/common/services/logger.service';
import { log } from '@/app/models/constants/logger.const';
import { EnvironmentClass } from 'environments/env-config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CleanupLogsTasks {
  private readonly daysToKeep = 30;
  private ENV_DIR: string = path.join(process.cwd(), 'environments');

  constructor(
    private readonly loggerService: LoggerService,
  ) {}

  /** 
  Ejecutar una vez al día a la medianoche */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    try {
      const envNames = this.#getEnvNamesFromEnvironmentsFolder();
      if (!envNames.length) return;

      for (const _env of envNames) {
        await this.cleanLogsForEnv();
      }

      this.loggerService.logInfo('CleanupLogsTasks completed successfully');
    } catch (err) {
      this.loggerService.logError('Error al correr CleanupLogsTasks', {
        error: err,
      });
    }
  }

  /**
  array con nombres de entornos a partir de archivos ".env.{nombre}" */
  #getEnvNamesFromEnvironmentsFolder(): string[] {
    try {
      if (!fs.existsSync(this.ENV_DIR)) return [];
      const files = fs.readdirSync(this.ENV_DIR);
      const envFiles = files.filter((f) => f.startsWith('.env.'));
      // extraer nombre despues de ".env."
      return envFiles.map((f) => f.replace('.env.', '')).filter(Boolean);
    } catch (err) {
      log.error('Error leyendo folder environments');
      return [];
    }
  }

  private async cleanLogsForEnv() {
    const baseDir = this.loggerService.getLogBaseDirForEnv();
    if (!fs.existsSync(baseDir)) return; // nada que borrar

    // Recorremos meses (carpetas) dentro de baseDir
    const months = await fs.readdir(baseDir);
    for (const monthDir of months) {
      const monthPath = path.join(baseDir, monthDir);
      if (!(await fs.stat(monthPath)).isDirectory()) continue;

      const files = await fs.readdir(monthPath);
      for (const file of files) {
        const filePath = path.join(monthPath, file);
        const stat = await fs.stat(filePath);
        if (!stat.isFile()) continue;
        // Intentamos extraer la fecha del nombre del archivo (pattern yyyy-MM-dd)
        // pino-roll producirá nombres como 'app.2025-11-10.log' o 'app.2025-11-10.log.gz' si comprimiste.
        const regex = /(\d{4}-\d{2}-\d{2})/;
        const match = file.match(regex);
        if (!match) {
          // si no tiene fecha, por seguridad no lo borramos
          continue;
        }
        const fileDateStr = match[1];
        const fileDate = DateTime.fromISO(fileDateStr, { zone: 'utc' });
        if (!fileDate.isValid) continue;
        const ageInDays = Math.floor(
          DateTime.utc().diff(fileDate.startOf('day'), 'days').days,
        );
        if (ageInDays > this.daysToKeep) {
          // borrar archivo solo
          await fs.remove(filePath);
          log.info(`Removed old log file: ${filePath}`);
        }
      }
      // NO borramos carpetas (cumple tu requisito)
    }
  }
}
