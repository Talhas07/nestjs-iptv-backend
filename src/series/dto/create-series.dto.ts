import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateSeriesDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  trailer_id: string;
  @IsNotEmpty()
  thumbnail_id: string;
}
