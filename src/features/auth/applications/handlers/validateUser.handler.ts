import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserQueryRepository } from '../../../users/repositories/user.query.repository';
import { CryptService } from '../../services/crypt.services';
import { isNil } from '@nestjs/common/utils/shared.utils';

export class ValidationUserCommand {
  constructor(
    public email: string,
    public password: string,
  ) {}
}

@QueryHandler(ValidationUserCommand)
export class ValidationUserHandler
  implements IQueryHandler<ValidationUserCommand>
{
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly cryptService: CryptService,
  ) {}

  async execute(command: ValidationUserCommand): Promise<any> {
    try {
      const user = await this.userQueryRepository.getUserByEmail(command.email);
      if (isNil(user)) return null;
      console.log(user);

      const isCorrect = await this.cryptService.comparePassword(
        command.password,
        user.password.password,
      );

      console.log(isCorrect);
      if (!isCorrect) {
        return null;
      }

      return user;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
