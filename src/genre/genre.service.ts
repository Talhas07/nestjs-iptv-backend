import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { genre, genredocument } from './schemas/genre.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class GenreService {
  constructor(
    @InjectModel(genre.name) private genreModel: Model<genredocument>,
  ) {}

  // POST /genres - Create a new genre
  async create(createGenreDto: CreateGenreDto) {
    return await this.genreModel.create(createGenreDto);
  }
  // GET /genres - Get all genres
  async findAll(query): Promise<genredocument[]> {
    console.log(query);
    const { page, limit, sort, ...otherparam } = query;
    console.log(page, limit, sort, otherparam);
    const pageby = parseInt(page) || 1;
    const limitby = parseInt(limit) || 50;
    const sortby = query.sort || '+name';

    const startIndex = (pageby - 1) * limitby;

    const sortOptions: any = { name: 1 };
    if (sortby === '-name') sortOptions.name = -1;

    return await this.genreModel
      .find(otherparam)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limitby)
      .exec();
  }
  // GET /genres/:id - Get a genre by id
  async findOne(id: string) {
    return await this.genreModel.findById(id).exec();
  }
  // PATCH /genres/:id - Update a genre by id
  async update(id: string, updateGenreDto: UpdateGenreDto) {
    return await this.genreModel.findByIdAndUpdate(id, updateGenreDto, {
      new: true,
    });
  }
  // DELETE /genres/:id - Delete a genre by id
  async delete(id: string) {
    return await this.genreModel.findByIdAndDelete(id);
  }
  // GET /genres/:id/series - Get all series of a genre by genre id
  async seriesbyid(id: string) {
    console.log(id);
    return await this.genreModel
      .aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },

        {
          $lookup: {
            from: 'genre_series',
            localField: '_id',
            foreignField: 'genre_id',
            as: 'genre_series',
          },
        },
        { $unwind: '$genre_series' },
        {
          $lookup: {
            from: 'series',
            localField: 'genre_series.series_id',
            foreignField: '_id',
            as: 'series',
          },
        },
      ])
      .exec();
  }
  // GET /genres/:id/series/seasons - Get all seasons of all series of a genre by genre id
  async seasonsbyid(id: string) {
    return await this.genreModel
      .aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },

        {
          $lookup: {
            from: 'genre_series',
            localField: '_id',
            foreignField: 'genre_id',
            as: 'genre_series',
          },
        },
        { $unwind: '$genre_series' },
        {
          $lookup: {
            from: 'series',
            localField: 'genre_series.series_id',
            foreignField: '_id',
            as: 'series',
          },
        },
        { $unwind: '$series' },
        {
          $lookup: {
            from: 'seasons',
            localField: 'series._id',
            foreignField: 'season_id',
            as: 'seasons',
          },
        },
      ])
      .exec();
  }
}
