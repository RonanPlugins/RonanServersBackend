import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { CategoryModule } from './category.module';
import { ServerModule } from '../server/server.module';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(config), CategoryModule, ServerModule],
      providers: [CategoryService],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
