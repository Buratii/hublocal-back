import { MessagesHelper } from '@helpers/messages.helper';
import { RegExHelper } from '@helpers/regex.helper';
import { IsNotEmpty, Matches } from 'class-validator';

export class SaveLocationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @Matches(RegExHelper.cep, {
    message: MessagesHelper.INVALID_CEP,
  })
  cep: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  neighborhood: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  companyId: string;
}
