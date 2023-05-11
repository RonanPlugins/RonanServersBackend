import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { UserModule } from './user.module';
import { ServerModule } from '../server/server.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { ServerService } from '../server/server.service';
import { UserEntity } from './user.entity/user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([UserEntity]),
        UserModule,
        ServerModule,
        AuthModule,
        JwtModule,
      ],
      providers: [UserService, AuthService, ServerService, JwtService],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
