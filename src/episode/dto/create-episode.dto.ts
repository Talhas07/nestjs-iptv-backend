import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEpisodeDto {
  @IsNotEmpty()
  season_id: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  thumbnail_id: string;
}
