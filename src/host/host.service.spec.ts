import { Test, TestingModule } from '@nestjs/testing';
import { HostService } from './host.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from './host.entity/host.entity';
import config from '../../ormconfig';

describe('HostService', () => {
  let service: HostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([HostEntity]),
      ],
      providers: [HostService],
    }).compile();

    service = module.get<HostService>(HostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
