import { Test, TestingModule } from '@nestjs/testing';
import { GenreSeriesController } from './genre-series.controller';
import { GenreSeriesService } from './genre-series.service';

describe('GenreSeriesController', () => {
  let controller: GenreSeriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreSeriesController],
      providers: [GenreSeriesService],
    }).compile();

    controller = module.get<GenreSeriesController>(GenreSeriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
