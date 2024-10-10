import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

@Injectable()
export class LoginDto {
  @IsNotEmpty()
  @MaxLength(32)
  @IsEmail()
  email!: string;

  @Length(6, 20)
  @Matches(
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{6,20}$/,
  )
  password!: string;
}
