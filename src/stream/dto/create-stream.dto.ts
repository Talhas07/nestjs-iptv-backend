import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateStreamDto {
  @IsNotEmpty()
  epiosde_id: string;
  @IsNotEmpty()
  user_id: string;
  @IsNotEmpty()
  time: string;
}
