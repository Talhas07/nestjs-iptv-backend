import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { InjectModel } from '@nestjs/mongoose';
import { season, seasondocument } from './schemas/season.schema';
import mongoose, { Model } from 'mongoose';
@Injectable()
export class SeasonService {
  constructor(
    @InjectModel(season.name) private seasonModel: Model<seasondocument>,
  ) {}

  // POST /seasons - Create a new season
  async create(createSeasonDto: CreateSeasonDto) {
    console.log(createSeasonDto);
    const model = new this.seasonModel(createSeasonDto);
    return model.save();
  }
  // GET /seasons - Get all seasons
  async findAll(query) {
    const { page, limit, sort, ...otherparam } = query;
    console.log(page, limit, sort, otherparam);
    const pageby = parseInt(page) || 1;
    const limitby = parseInt(limit) || 10;
    const sortby = query.sort || '+name';

    const startIndex = (page - 1) * limitby;

    const sortOptions: any = { name: 1 };
    if (sortby === '-name') sortOptions.name = -1;

    return await this.seasonModel
      .find(otherparam)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limitby)
      .exec();
  }
  // GET /seasons/:id - Get a season by id
  async findOne(id: string) {
    return this.seasonModel.findById(id).exec();
  }
  // PATCH /seasons/:id - Update a season by id
  async update(id: string, updateSeasonDto: UpdateSeasonDto) {
    return this.seasonModel
      .findByIdAndUpdate(id, updateSeasonDto, { new: true })
      .exec();
  }
  // DELETE /seasons/:id - Delete a season by id
  async remove(id: string) {
    return this.seasonModel.findByIdAndDelete(id).exec();
  }

  // GET /seasons/:id/episodes - Get all episodes of a season by season id
  async episodebyid(id: string) {
    return this.seasonModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: 'episodes',
            localField: '_id',
            foreignField: 'season_id',
            as: 'episodes',
          },
        },
      ])
      .exec();
  }
}
