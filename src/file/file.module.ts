import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { file, fileschema } from './schemas/fileschema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: file.name, schema: fileschema }]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
