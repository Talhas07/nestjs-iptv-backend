import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { file, filedocument } from './schemas/fileschema';
import { Model } from 'mongoose';
@Injectable()
export class FileService {
  constructor(@InjectModel(file.name) private fileModel: Model<filedocument>) {}
}
