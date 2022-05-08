import { sign, verify } from 'jsonwebtoken';
import { JWT_CONFIGS } from '../config';
export class TokenManager {
  async createToken(payload): Promise<string> {
    return sign(payload, JWT_CONFIGS.SECRET, {
      algorithm: 'HS256',
      expiresIn: '3h',
    });
    // return new Promise((resolve, reject) => {});
  }
  decodeToken(token: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      verify(token, (err: unknown, data: unknown) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}
