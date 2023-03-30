import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyService } from './company.service';
import { CompanyEntity } from './company.entity';

describe('CompanyService', () => {
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: {},
        },
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
  });
});
