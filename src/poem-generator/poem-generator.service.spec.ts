import { Test, TestingModule } from '@nestjs/testing';
import { PoemGeneratorService } from './poem-generator.service';

describe('PoemGeneratorService', () => {
  let service: PoemGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoemGeneratorService],
    }).compile();

    service = module.get<PoemGeneratorService>(PoemGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
