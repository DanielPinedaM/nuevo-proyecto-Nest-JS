import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  UserId: number;

  @Column({ type: 'varchar', length: 200, unique: true })
  User: string;

  @Column({ type: 'varchar', length: 100 })
  UserName: string;

  @Column({ type: 'varchar', length: 255 })
  Password: string;

  @Column({ type: 'int' })
  RolId: number;

  @CreateDateColumn()
  CreationDate: Date;
}
