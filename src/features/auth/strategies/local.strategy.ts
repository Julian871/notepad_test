import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { QueryBus } from '@nestjs/cqrs';
import { ValidationUserCommand } from '../applications/handlers/validateUser.handler';
import { User } from '../../../libs/typeorm/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.queryBus.execute(
      new ValidationUserCommand(email, password),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
