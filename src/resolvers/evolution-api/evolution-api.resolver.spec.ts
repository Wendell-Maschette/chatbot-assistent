import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionApiResolver } from './evolution-api.resolver';

describe('EvolutionApiResolver', () => {
  let resolver: EvolutionApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvolutionApiResolver],
    }).compile();

    resolver = module.get<EvolutionApiResolver>(EvolutionApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
