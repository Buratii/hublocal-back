import { RegExHelper } from './../../../helpers/regex.helper';
import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { MessagesHelper } from '@helpers/messages.helper';

export class SaveUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.VALIDATE_PASSWORD,
  })
  password: string;
}
