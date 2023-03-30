import { IsNotEmpty } from 'class-validator';

export class SaveLocationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  neighbourhood: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  companyId: string;
}
