import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { genre, genreschema } from './schemas/genre.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: genre.name, schema: genreschema }]),
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
