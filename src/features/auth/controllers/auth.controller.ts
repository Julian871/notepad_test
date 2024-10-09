import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegistrationDto } from '../applications/dto/registration.dto';
import { RegistrationCommand } from '../applications/handlers/registration.handler';
import { CreateUserModel } from '../models/createUser.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiTags('Authorization')
  @Post('/registration')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() dto: RegistrationDto): Promise<CreateUserModel> {
    return this.commandBus.execute(new RegistrationCommand(dto));
  }
}
