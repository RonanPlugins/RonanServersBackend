import { Test, TestingModule } from '@nestjs/testing';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from './host.entity/host.entity';
import config from '../../ormconfig';

describe('HostController', () => {
  let controller: HostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([HostEntity]),
      ],
      controllers: [HostController],
      providers: [HostService],
    }).compile();

    controller = module.get<HostController>(HostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
