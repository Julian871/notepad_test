import { Module } from '@nestjs/common';
import { handlers } from './applications/handlers/handlers';
import { AuthController } from './controllers/auth.controller';
import { CustomTypeOrmModule } from '../../libs/typeorm/typeorm.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../users/user.module';
import { CryptService } from './services/crypt.services';
import { MailService } from '../../mail/mail.service';
import { strategies } from './strategies/strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [CustomTypeOrmModule, CqrsModule, PassportModule, UserModule],
  controllers: [AuthController],
  providers: [...handlers, CryptService, MailService, ...strategies],
})
export class AuthModule {}
