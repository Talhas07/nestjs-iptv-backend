import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // POST /genres - Create a new genre
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  // GET /genres - Get all genres
  @Get()
  findAll(@Query() query: any) {
    return this.genreService.findAll(query);
  }
  // GET /genres/:id - Get a genre by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }
  // PATCH /genres/:id - Update a genre by id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(id, updateGenreDto);
  }
  // DELETE /genres/:id - Delete a genre by id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.genreService.delete(id);
  }

  // GET /genres/:id/series - Get all series of a genre by genre id

  @Get(':id/series')
  seriesbyid(@Param('id') id: string) {
    return this.genreService.seriesbyid(id);
  }
  // GET /genres/:id/series/seasons - Get all seasons of all series of a genre by genre id

  @Get(':id/series/seasons')
  seasonbyid(@Param('id') id: string) {
    return this.genreService.seasonsbyid(id);
  }
}
