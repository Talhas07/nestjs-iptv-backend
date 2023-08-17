import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateSeasonDto {
  @IsNotEmpty()
  season_id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
}
