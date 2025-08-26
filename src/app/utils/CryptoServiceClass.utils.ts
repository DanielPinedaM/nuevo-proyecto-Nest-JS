import { enc, mode, pad, AES } from 'crypto-js';
import {
  IVAuth,
  secretKeyAuthentication,
} from '@/app/models/constants/auth.constants';

export default class CryptoServiceClass {
  public static async encrypt(text: string): Promise<string> {
    const key = enc.Utf8.parse(secretKeyAuthentication); // número hexadecimal de 16 dígitos como clave
    const iv = enc.Utf8.parse(IVAuth); // Número hexadecimal como desplazamiento de clave

    const textoHexa = enc.Utf8.parse(text);
    const encrypted = AES.encrypt(textoHexa, key, {
      keySize: 128,
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    // Aquí devolvemos todo el objeto cifrado en formato Base64
    return encrypted.toString();
  }

  public static async decrypt(encryptedText: string): Promise<string> {
    const key = enc.Utf8.parse(secretKeyAuthentication);
    const iv = enc.Utf8.parse(IVAuth);

    // AES.decrypt ahora acepta el texto cifrado completo
    const decrypted = AES.decrypt(encryptedText, key, {
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    });

    return decrypted.toString(enc.Utf8);
  }
}
