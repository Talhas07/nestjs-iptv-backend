import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreSeriesService } from './genre-series.service';
import { CreateGenreSeryDto } from './dto/create-genre-sery.dto';
import { UpdateGenreSeryDto } from './dto/update-genre-sery.dto';

@Controller('genre-series')
export class GenreSeriesController {
  constructor(private readonly genreSeriesService: GenreSeriesService) {}

  @Post()
  create(@Body() createGenreSeryDto: CreateGenreSeryDto) {
    return this.genreSeriesService.create(createGenreSeryDto);
  }

  @Get()
  findAll() {
    return this.genreSeriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreSeriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreSeryDto: UpdateGenreSeryDto) {
    return this.genreSeriesService.update(+id, updateGenreSeryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreSeriesService.remove(+id);
  }
}
