import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        AuthModule,
        UserModule,
        JwtModule,
      ],
      providers: [AuthService, UserService, JwtService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
