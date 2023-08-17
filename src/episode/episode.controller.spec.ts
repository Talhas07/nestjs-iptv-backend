import { Test, TestingModule } from '@nestjs/testing';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

describe('EpisodeController', () => {
  let controller: EpisodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodeController],
      providers: [EpisodeService],
    }).compile();

    controller = module.get<EpisodeController>(EpisodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
