import { Module } from '@nestjs/common';
import { GenreSeriesService } from './genre-series.service';
import { GenreSeriesController } from './genre-series.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  genre_series,
  genre_seriesschema,
} from './schemas/genre_series.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: genre_series.name, schema: genre_seriesschema },
    ]),
  ],
  controllers: [GenreSeriesController],
  providers: [GenreSeriesService],
})
export class GenreSeriesModule {}
