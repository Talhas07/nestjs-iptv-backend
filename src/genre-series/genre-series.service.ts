import { Injectable } from '@nestjs/common';
import { CreateGenreSeryDto } from './dto/create-genre-sery.dto';
import { UpdateGenreSeryDto } from './dto/update-genre-sery.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  genre_series,
  genre_seriesdocument,
} from './schemas/genre_series.schema';
import { Model } from 'mongoose';

@Injectable()
export class GenreSeriesService {
  constructor(
    @InjectModel(genre_series.name)
    private genre_seriesModel: Model<genre_seriesdocument>,
  ) {}
  create(createGenreSeryDto: CreateGenreSeryDto) {
    return 'This action adds a new genreSery';
  }

  findAll() {
    return `This action returns all genreSeries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} genreSery`;
  }

  update(id: number, updateGenreSeryDto: UpdateGenreSeryDto) {
    return `This action updates a #${id} genreSery`;
  }

  remove(id: number) {
    return `This action removes a #${id} genreSery`;
  }
}
