import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { season, seasonschema } from './schemas/season.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: season.name, schema: seasonschema }]),
  ],
  controllers: [SeasonController],
  providers: [SeasonService],
})
export class SeasonModule {}
