import { Injectable } from '@nestjs/common';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { InjectModel } from '@nestjs/mongoose';
import { episode, episodedocument } from './schemas/episode.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectModel(episode.name) private episodeModel: Model<episodedocument>,
  ) {}
  // POST /episodes - Create a new episode
  async create(
    createEpisodeDto: CreateEpisodeDto,
  ): Promise<episodedocument | any> {
    const model = new this.episodeModel(createEpisodeDto);
    return model.save();
  }
  // GET /episodes - Get all episodes
  async findAll(query): Promise<episodedocument[]> {
    const { page, limit, sort, ...otherparam } = query;
    console.log(page, limit, sort, otherparam);
    const pageby = parseInt(page) || 1;
    const limitby = parseInt(limit) || 10;
    const sortby = query.sort || '+name';

    const startIndex = (page - 1) * limitby;

    const sortOptions: any = { name: 1 };
    if (sortby === '-name') sortOptions.name = -1;

    return await this.episodeModel
      .find(otherparam)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limitby)
      .exec();
  }
  // GET /episodes/:id - Get an episode by id
  async findOne(id: string) {
    return await this.episodeModel.findById(id).exec();
  }
  // PATCH /episodes/:id - Update an episode by id
  async update(id: string, updateEpisodeDto: UpdateEpisodeDto) {
    return await this.episodeModel.findByIdAndUpdate(id, updateEpisodeDto, {
      new: true,
    });
  }
  // DELETE /episodes/:id - Delete an episode by id
  async delete(id: string) {
    return await this.episodeModel.findByIdAndDelete(id);
  }
  // GET /episodes/:id/streams - Get all streams of an episode by episode id
  async streambyid(id: string) {
    return this.episodeModel
      .aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'streams',
            localField: '_id',
            foreignField: 'episode_id',
            as: 'streams',
          },
        },
      ])
      .exec();
  }
}
