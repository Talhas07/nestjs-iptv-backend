import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreSeryDto } from './create-genre-sery.dto';

export class UpdateGenreSeryDto extends PartialType(CreateGenreSeryDto) {}
