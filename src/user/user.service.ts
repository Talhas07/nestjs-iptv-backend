import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, userdocument } from './schemas/user.schema';
import { Model, SortOrder } from 'mongoose';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { streamdocument, stream } from 'src/stream/schemas/stream.schema';
// POST /episodes - Create a new episode
// GET /episodes - Get all episodes
// GET /episodes/:id - Get an episode by id
// GET /episodes/:id/streams - Get all streams of an episode by episode id
// PATCH /episodes/:id - Update an episode by id
// DELETE /episodes/:id - Delete an episode by id
@Injectable()
export class UserService {
  constructor(
    @InjectModel(user.name) private userModel: Model<userdocument>,
    @InjectModel(stream.name) private streamModel: Model<streamdocument>,
  ) {}

  // login user get user
  async login(email: string) {
    console.log(email);
    return await this.userModel.findOne({ email: email });
  }
  // create user
  async create(createUserDto: CreateUserDto) {
    const Model = new this.userModel(
      createUserDto,
      //   {
      //   first_name: createUserDto.first_name,
      //   last_name: createUserDto.last_name,
      //   email: createUserDto.email,
      //   password: bcrypt.hashSync(createUserDto.password, 10),
      // }
    );
    console.log(Model);
    return await Model.save();
  }
  //find all users
  async findAll(query): Promise<userdocument[]> {
    console.log(query);
    const { page, sort, ...otherparam } = query;
    console.log(page, sort, otherparam);
    const pageby = parseInt(page) || 1;
    // const limitby = parseInt(limit) || 1000;
    const sortby = query.sort || '+name';

    // const startIndex = (pageby - 1) * limitby;

    const sortOptions: any = { first_name: 1 };
    if (sortby === '-name') sortOptions.first_name = -1;

    return await this.userModel
      .find(otherparam)
      .sort(sortOptions)
      // .skip(startIndex)
      // .limit(limitby)
      .exec();
  }
  //find one user
  async findOne(id: string): Promise<userdocument> {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async streambyid(id: string) {
    return await this.userModel
      .aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'streams',
            localField: '_id',
            foreignField: 'user_id',
            as: 'streams',
          },
        },
      ])
      .exec();
  }
  async streambytwoid(id: string, streamid: string) {
    return await this.userModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'streams',
          localField: '_id',
          foreignField: 'user_id',
          as: 'streams',
        },
      },
      { $unwind: '$streams' },
      {
        $match: { 'streams._id': new mongoose.Types.ObjectId(streamid) },
      },
    ]);
  }
  async deletebytwoid(id: string, streamid: string) {
    return await this.streamModel
      .findOne({
        _id: streamid,
        user_id: new mongoose.Types.ObjectId(id),
      })
      .exec();
  }
}
