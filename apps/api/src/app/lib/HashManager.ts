import { compareSync, hashSync } from 'bcryptjs';
import { JWT_CONFIGS } from '../config';

export class HashManager {
  createHashValue(password: string): string {
    return hashSync(password, JWT_CONFIGS.salt);
  }
  decryptHashValue(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }
}
