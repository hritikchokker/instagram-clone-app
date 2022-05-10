import { sign, decode } from 'jsonwebtoken';
import { JWT_CONFIGS } from '../config';
export class TokenManager {
  async createToken(payload): Promise<string> {
    return sign(payload, JWT_CONFIGS.SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
    });
    // return new Promise((resolve, reject) => {});
  }
  async decodeToken(token: string): Promise<unknown> {
    return decode(token, { complete: true })?.payload;
  }
}
