import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { episode, episodeschema } from './schemas/episode.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: episode.name, schema: episodeschema }]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
