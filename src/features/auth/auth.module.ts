import { Module } from '@nestjs/common';
import { handlers } from './applications/handlers/handlers';
import { AuthController } from './controllers/auth.controller';
import { CustomTypeOrmModule } from '../../libs/typeorm/typeorm.module';
import { CqrsModule } from '@nestjs/cqrs';
import { UserModule } from '../users/user.module';
import { CryptService } from './services/crypt.services';
import { MailService } from '../../mail/mail.service';

@Module({
  imports: [CustomTypeOrmModule, CqrsModule, UserModule],
  controllers: [AuthController],
  providers: [...handlers, CryptService, MailService],
})
export class AuthModule {}
