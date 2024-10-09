import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { User } from './entities/user.entity';
import { Email } from './entities/email.entity';
import { Password } from './entities/password.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        type: 'postgres',
        url: configService.db_url,
        ssl: true,
        entities: ['../entities/**/*.entity.ts'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Email, Password, Profile]),
  ],
  exports: [TypeOrmModule],
})
export class CustomTypeOrmModule {}
