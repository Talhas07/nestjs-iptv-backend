import { Injectable } from '@nestjs/common';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { stream, streamdocument } from './schemas/stream.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { userdocument } from 'src/user/schemas/user.schema';

@Injectable()
export class StreamService {
  constructor(
    @InjectModel(stream.name) private streamModel: Model<streamdocument>,
  ) {}
  async create(createStreamDto: CreateStreamDto) {
    const model = new this.streamModel(createStreamDto);
    return await model.save();
  }

  async findAll(query): Promise<streamdocument[]> {
    console.log(query);
    const { page, limit, sort, ...otherparam } = query;
    console.log(page, limit, sort, otherparam);
    const pageby = parseInt(page) || 1;
    const limitby = parseInt(limit) || 10;
    const sortby = query.sort || '+time';

    const startIndex = (pageby - 1) * limitby;

    const sortOptions: any = { time: 1 };
    if (sortby === '-time') sortOptions.time = -1;

    return await this.streamModel
      .find(otherparam)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limitby)
      .exec();
  }

  async findOne(id: string): Promise<any> {
    return await this.streamModel.findById(id).exec();
  }

  async update(id: string, updateStreamDto: UpdateStreamDto) {
    console.log(id, updateStreamDto);
    return await this.streamModel.findByIdAndUpdate(id, updateStreamDto, {
      new: true,
    });
  }

  async delete(id: string) {
    return await this.streamModel.findByIdAndDelete(id);
  }
  //   GET /streams/:id/episode - Get the episode of a stream by stream id
  async episodebyid(id: string) {
    return this.streamModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'episodes',
            localField: 'episode_id',
            foreignField: '_id',
            as: 'episodes',
          },
        },
      ])
      .exec();
  }
  // GET /streams/:id/user - Get the user of a stream by stream id
  async userbyid(id: string) {
    return this.streamModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'users',
          },
        },
      ])
      .exec();
  }
  // GET /streams/:id/episode/season - Get the season of an episode of a stream by stream id
  async seasonbyid(id: string) {
    return this.streamModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'episodes',
            localField: 'episode_id',
            foreignField: '_id',
            as: 'episodes',
          },
        },
        { $unwind: '$episodes' },
        {
          $lookup: {
            from: 'seasons',
            localField: 'episodes.season_id',
            foreignField: '_id',
            as: 'seasons',
          },
        },
      ])
      .exec();
  }
  // GET /streams/:id/episode/season/series - Get the series of a season of an episode of a stream by stream id

  async seriesbyid(id: string) {
    return this.streamModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'episodes',
            localField: 'episode_id',
            foreignField: '_id',
            as: 'episodes',
          },
        },
        { $unwind: '$episodes' },
        {
          $lookup: {
            from: 'seasons',
            localField: 'episodes.season_id',
            foreignField: '_id',
            as: 'seasons',
          },
        },
        { $unwind: '$seasons' },
        {
          $lookup: {
            from: 'series',
            localField: 'seasons.season_id',
            foreignField: '_id',
            as: 'series',
          },
        },
      ])
      .exec();
  }
  // GET /streams/:id/episode/season/series/genre - Get the genre of a series of a season of an episode of a stream by stream id

  async genrebyid(id: string) {
    return this.streamModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'episodes',
            localField: 'episode_id',
            foreignField: '_id',
            as: 'episodes',
          },
        },
        { $unwind: '$episodes' },
        {
          $lookup: {
            from: 'seasons',
            localField: 'episodes.season_id',
            foreignField: '_id',
            as: 'seasons',
          },
        },
        { $unwind: '$seasons' },
        {
          $lookup: {
            from: 'series',
            localField: 'seasons.season_id',
            foreignField: '_id',
            as: 'series',
          },
        },
        { $unwind: '$series' },
        {
          $lookup: {
            from: 'genre_series',
            localField: 'series._id',
            foreignField: 'series_id',
            as: 'genre_series',
          },
        },
        { $unwind: '$genre_series' },

        {
          $lookup: {
            from: 'genres',
            localField: 'genre_series.genre_id',
            foreignField: '_id',
            as: 'genres',
          },
        },
      ])
      .exec();
  }
}
