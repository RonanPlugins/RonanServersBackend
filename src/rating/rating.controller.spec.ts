import { Test, TestingModule } from '@nestjs/testing';
import { RatingController } from './rating.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { ServerModule } from '../server/server.module';
import { ServerService } from '../server/server.service';
import { RatingEntity } from './rating.entity/rating.entity';
import { RatingService } from './rating.service';
import { RatingModule } from './rating.module';

describe('RatingController', () => {
  let controller: RatingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([RatingEntity]),
        ServerModule,
        RatingModule,
      ],
      providers: [ServerService, RatingService],
      controllers: [RatingController],
    }).compile();

    controller = module.get<RatingController>(RatingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
