import { Test, TestingModule } from '@nestjs/testing';
import { ServerVerificationController } from './server-verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { ServerVerificationModule } from './server-verification.module';
import { ServerModule } from '../server/server.module';

describe('ServerVerificationController', () => {
  let controller: ServerVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        ServerVerificationModule,
        ServerModule,
      ],
      controllers: [ServerVerificationController],
    }).compile();

    controller = module.get<ServerVerificationController>(
      ServerVerificationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
