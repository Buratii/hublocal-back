import { RegExHelper } from './../../../helpers/regex.helper';
import { IsNotEmpty, Matches } from 'class-validator';
import { MessagesHelper } from '@helpers/messages.helper';

export class SaveCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  website: string;

  @IsNotEmpty()
  @Matches(RegExHelper.cnpj, {
    message: MessagesHelper.INVALID_PASSWORD,
  })
  cnpj: string;
}
