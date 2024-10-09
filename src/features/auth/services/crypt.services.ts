import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptService {
  async hashPassword(password: string): Promise<string> {
    try {
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      return bcrypt.hash(password, salt);
    } catch (error) {
      console.log('hash error: ', error);
      throw new Error('Hash error');
    }
  }

  async comparePassword(
    userPassword: string,
    dbPassword: string,
  ): Promise<boolean> {
    try {
      return bcrypt.compare(userPassword, dbPassword);
    } catch {
      return false;
    }
  }
}
