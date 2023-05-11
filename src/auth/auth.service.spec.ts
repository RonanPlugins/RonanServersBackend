import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { AuthModule } from './auth.module';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { ServerModule } from '../server/server.module';
import { ServerService } from '../server/server.service';
import { UserEntity } from '../user/user.entity/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        AuthModule,
        UserModule,
        JwtModule,
        ServerModule,
      ],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ServerService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {}, // replace with a mock repository if needed
        },
      ],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
