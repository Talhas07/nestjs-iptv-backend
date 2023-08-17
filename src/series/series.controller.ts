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
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}
  // POST /series - Create a new series
  @Post()
  create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesService.create(createSeriesDto);
  }
  // GET /series - Get all series
  @Get()
  findAll(@Query() query: any) {
    return this.seriesService.findAll(query);
  }
  // GET /series/:id - Get a series by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(id);
  }
  // PATCH /series/:id - Update a series by id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeriesDto: UpdateSeriesDto) {
    return this.seriesService.update(id, updateSeriesDto);
  }
  // DELETE /series/:id - Delete a series by id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.seriesService.delete(id);
  }
  // GET /series/:id/seasons - Get all seasons of a series by series id
  @Get(':id/seasons')
  seasonbyid(@Param('id') id: string) {
    return this.seriesService.seasonsbyid(id);
  }
  // GET /series/:id/seasons/episodes - Get all episodes of a series by series id
  @Get(':id/seasons/episodes')
  episodebyid(@Param('id') id: string) {
    return this.seriesService.episodebyid(id);
  }
}
