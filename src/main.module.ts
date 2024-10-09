import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from './libs/config/config.module';
import { UserModule } from './features/users/user.module';
import { CustomTypeOrmModule } from './libs/typeorm/typeorm.module';
import { AuthModule } from './features/auth/auth.module';
import { CustomSwaggerModule } from './swagger/swagger.module';
import { APP_PIPE } from '@nestjs/core';
import { CustomMailModule } from './mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    CustomTypeOrmModule,
    UserModule,
    AuthModule,
    CustomSwaggerModule,
    CustomMailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class MainModule {}
