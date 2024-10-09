import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegistrationDto } from '../dto/registration.dto';
import { UserRepository } from '../../../users/repositories/user.repository';
import { UserQueryRepository } from '../../../users/repositories/user.query.repository';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Profile } from '../../../../libs/typeorm/entities/profile.entity';
import { Email } from '../../../../libs/typeorm/entities/email.entity';
import { addHours } from 'date-fns';
import { CryptService } from '../../services/crypt.services';
import { User } from '../../../../libs/typeorm/entities/user.entity';
import { Password } from '../../../../libs/typeorm/entities/password.entity';
import { CreateUserModel } from '../../models/createUser.model';
import { MailService } from '../../../../mail/mail.service';

export class RegistrationCommand {
  constructor(public dto: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationHandler
  implements ICommandHandler<RegistrationCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userQueryRepository: UserQueryRepository,
    private readonly cryptService: CryptService,
    private readonly mailService: MailService,
  ) {}

  async execute(command: RegistrationCommand): Promise<CreateUserModel> {
    try {
      await this.checkEmailExist(command.dto.email);

      const user = await this.createUser(
        command.dto.email,
        command.dto.name,
        command.dto.password,
      );

      return new CreateUserModel(user);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async checkEmailExist(email: string): Promise<void> {
    const user = await this.userQueryRepository.getUserByEmail(email);
    if (user) throw new BadRequestException('This email exist');
  }

  async createUser(
    emailAddress: string,
    name: string,
    password: string,
  ): Promise<User> {
    const newProfile = new Profile(name);

    const confirmCode = await this.createAndSendConfirmCode(emailAddress);
    const newEmail = new Email(
      emailAddress,
      confirmCode,
      addHours(new Date(), 1),
    );

    const passwordHash = await this.cryptService.hashPassword(password);
    const newPassword = new Password(passwordHash);

    const newUser = new User(newEmail, newPassword, newProfile);
    return this.userRepository.save(newUser);
  }

  async createAndSendConfirmCode(email: string): Promise<string> {
    const code = uuidv4();
    await this.mailService.sendConfirmCode(email, code);
    return code;
  }
}
