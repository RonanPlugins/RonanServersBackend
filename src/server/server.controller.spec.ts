import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ServerModule } from './server.module';
import { AuthModule } from '../auth/auth.module';
import { ServerEntity } from './server.entity/server.entity';
import { ServerService } from './server.service';
import config from '../../ormconfig';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('ServerController', () => {
  let controller: ServerController;

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
      providers: [UserService, AuthService, ServerService, JwtService],
      controllers: [ServerController],
    }).compile();

    controller = module.get<ServerController>(ServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
