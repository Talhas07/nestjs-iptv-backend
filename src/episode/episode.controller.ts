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
import { EpisodeService } from './episode.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Controller('episodes')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}
  // POST /episodes - Create a new episode
  @Post()
  create(@Body() createEpisodeDto: CreateEpisodeDto) {
    return this.episodeService.create(createEpisodeDto);
  }
  // GET /episodes - Get all episodes
  @Get()
  findAll(@Query() query: any) {
    console.log(query);
    return this.episodeService.findAll(query);
  }
  // GET /episodes/:id - Get an episode by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodeService.findOne(id);
  }
  // PATCH /episodes/:id - Update an episode by id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpisodeDto: UpdateEpisodeDto) {
    return this.episodeService.update(id, updateEpisodeDto);
  }

  // DELETE /episodes/:id - Delete an episode by id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.episodeService.delete(id);
  }
  // GET /episodes/:id/streams - Get all streams of an episode by episode id
  @Get(':id/streams')
  streambyid(@Param('id') id: string) {
    return this.episodeService.streambyid(id);
  }
}
