import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CustomTypeOrmModule } from '../../libs/typeorm/typeorm.module';
import { UserQueryRepository } from './repositories/user.query.repository';

@Module({
  imports: [CustomTypeOrmModule],
  controllers: [],
  providers: [UserRepository, UserQueryRepository],
  exports: [UserRepository, UserQueryRepository],
})
export class UserModule {}
