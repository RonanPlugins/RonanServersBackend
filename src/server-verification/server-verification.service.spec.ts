import { Test, TestingModule } from '@nestjs/testing';
import { ServerVerificationService } from './server-verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { ServerVerificationModule } from './server-verification.module';
import { ServerModule } from '../server/server.module';

describe('ServerVerificationService', () => {
  let service: ServerVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        ServerVerificationModule,
        ServerModule,
      ],
      providers: [ServerVerificationService],
    }).compile();

    service = module.get<ServerVerificationService>(ServerVerificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
