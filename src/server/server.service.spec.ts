import { Test, TestingModule } from '@nestjs/testing';
import { ServerService } from './server.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { ServerEntity } from './server.entity/server.entity';
import { UserModule } from '../user/user.module';
import { ServerModule } from './server.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { ServerController } from './server.controller';

describe('ServerService', () => {
  let service: ServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([ServerEntity]),
        UserModule,
        ServerModule,
        AuthModule,
        JwtModule,
      ],
      providers: [UserService, AuthService, ServerService],
    }).compile();

    service = module.get<ServerService>(ServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
