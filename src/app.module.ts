import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StreamModule } from './stream/stream.module';
import { EpisodeModule } from './episode/episode.module';
import { SeasonModule } from './season/season.module';
import { SeriesModule } from './series/series.module';
import { GenreSeriesModule } from './genre-series/genre-series.module';
import { GenreModule } from './genre/genre.module';
import { FileModule } from './file/file.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    StreamModule,
    EpisodeModule,
    SeasonModule,
    SeriesModule,
    GenreSeriesModule,
    GenreModule,
    FileModule,
  
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/database'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
