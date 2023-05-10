import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity/user.entity';
import { UserModule } from '../user/user.module';
import { ServerModule } from './server.module';
import { AuthModule } from '../auth/auth.module';
import { ServerEntity } from './server.entity/server.entity';
import { ServerService } from './server.service';

describe('ServerController', () => {
  let controller: ServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([ServerEntity]),
        UserModule,
        ServerModule,
        AuthModule,
      ],
      providers: [UserService, AuthService, ServerService],
      controllers: [ServerController],
    }).compile();

    controller = module.get<ServerController>(ServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
