import { Test, TestingModule } from '@nestjs/testing';
import { GenreSeriesService } from './genre-series.service';

describe('GenreSeriesService', () => {
  let service: GenreSeriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenreSeriesService],
    }).compile();

    service = module.get<GenreSeriesService>(GenreSeriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
