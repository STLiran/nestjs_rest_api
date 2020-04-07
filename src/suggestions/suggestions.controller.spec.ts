import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsController } from './suggestions.controller';

describe('Suggestions Controller', () => {
  let controller: SuggestionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestionsController],
    }).compile();

    controller = module.get<SuggestionsController>(SuggestionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
