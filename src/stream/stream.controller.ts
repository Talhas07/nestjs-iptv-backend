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
import { StreamService } from './stream.service';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';
import { query } from 'express';

@Controller('streams')
export class StreamController {
  constructor(private readonly streamService: StreamService) {}
  // POST /streams - Create a new stream
  @Post()
  create(@Body() createStreamDto: CreateStreamDto) {
    return this.streamService.create(createStreamDto);
  }
  // GET /streams - Get all streams
  @Get()
  findAll(@Query() query: any) {
    console.log(query);

    return this.streamService.findAll(query);
  }
  // GET /streams/:id - Get a stream by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamService.findOne(id);
  }
  // PATCH /streams/:id - Update a stream by id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStreamDto: UpdateStreamDto) {
    return this.streamService.update(id, updateStreamDto);
  }
  // DELETE /streams/:id - Delete a stream by id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.streamService.delete(id);
  }

  // GET /streams/:id/episode - Get the episode of a stream by stream id
  @Get(':id/episodes')
  episodebyid(@Param('id') id: string) {
    return this.streamService.episodebyid(id);
  }
  // GET /streams/:id/user - Get the user of a stream by stream id
  @Get(':id/user')
  userbyid(@Param('id') id: string) {
    return this.streamService.userbyid(id);
  }
  // GET /streams/:id/episode/season - Get the season of an episode of a stream by stream id
  @Get(':id/episode/season')
  seasonbyid(@Param('id') id: string) {
    return this.streamService.seasonbyid(id);
  }
  // GET /streams/:id/episode/season/series - Get the series of a season of an episode of a stream by stream id
  @Get(':id/episode/season/series')
  seriesbyid(@Param('id') id: string) {
    return this.streamService.seriesbyid(id);
  }

  // GET /streams/:id/episode/season/series/genre - Get the genre of a series of a season of an episode of a stream by stream id
  @Get(':id/episode/season/series/genre')
  genrebyid(@Param('id') id: string) {
    return this.streamService.genrebyid(id);
  }
}
