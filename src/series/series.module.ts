import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { series, seriesschema } from './schemas/series.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: series.name, schema: seriesschema }]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
