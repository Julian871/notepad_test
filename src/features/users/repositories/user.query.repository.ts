import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../libs/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly userQueryRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string) {
    return this.userQueryRepository
      .createQueryBuilder('user')
      .where('email.address = :email', { email })
      .leftJoinAndSelect('user.email', 'email')
      .getOne();
  }
}
