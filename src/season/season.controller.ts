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
import { SeasonService } from './season.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Controller('seasons')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}
  // POST /seasons - Create a new season
  @Post()
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonService.create(createSeasonDto);
  }
  // GET /seasons - Get all seasons
  @Get()
  findAll(@Query() query) {
    return this.seasonService.findAll(query);
  }
  // GET /seasons/:id - Get a season by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seasonService.findOne(id);
  }
  // PATCH /seasons/:id - Update a season by id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
    return this.seasonService.update(id, updateSeasonDto);
  }

  // DELETE /seasons/:id - Delete a season by id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seasonService.remove(id);
  }

  // GET /seasons/:id/episodes - Get all episodes of a season by season id
  @Get(':id/episodes')
  episodebyid(@Param('id') id: string) {
    return this.seasonService.episodebyid(id);
  }
}
