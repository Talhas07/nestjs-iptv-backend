import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectModel } from '@nestjs/mongoose';
import { series, seriesdocument } from './schemas/series.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class SeriesService {
  constructor(
    @InjectModel(series.name) private seriesModel: Model<seriesdocument>,
  ) {}
  // POST /series - Create a new series
  async create(createSeriesDto: CreateSeriesDto) {
    return await this.seriesModel.create(createSeriesDto);
  }

  // GET /series - Get all series
  async findAll(query) {
    console.log(query);
    const { page, limit, sort, ...otherparam } = query;
    console.log(page, limit, sort, otherparam);
    const pageby = parseInt(page) || 1;
    const limitby = parseInt(limit) || 10;
    const sortby = query.sort || '+name';

    const startIndex = (pageby - 1) * limitby;

    const sortOptions: any = { name: 1 };
    if (sortby === '-name') sortOptions.name = -1;

    return await this.seriesModel
      .find(otherparam)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limitby)
      .exec();
  }
  // GET /series/:id - Get a series by id
  async findOne(id: string) {
    return await this.seriesModel.findById(id).exec();
  }
  // PATCH /series/:id - Update a series by id
  async update(id: string, updateSeriesDto: UpdateSeriesDto) {
    return await this.seriesModel.findByIdAndUpdate(id, updateSeriesDto, {
      new: true,
    });
  }
  // DELETE /series/:id - Delete a series by id
  async delete(id: string) {
    return await this.seriesModel.findByIdAndDelete(id).exec();
  }
  // GET /series/:id/seasons - Get all seasons of a series by series id
  async seasonsbyid(id: string) {
    return await this.seriesModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'seasons',
            localField: '_id',
            foreignField: 'season_id',
            as: 'seasons',
          },
        },
      ])
      .exec();
  }
  // GET /series/:id/seasons/episodes - Get all episodes of a series by series id
  async episodebyid(id: string) {
    return await this.seriesModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'seasons',
            localField: '_id',
            foreignField: 'season_id',
            as: 'seasons',
          },
        },
        { $unwind: '$seasons' },
        {
          $lookup: {
            from: 'episodes',
            localField: 'seasons._id',
            foreignField: 'season_id',
            as: 'episodes',
          },
        },
      ])
      .exec();
  }
}
