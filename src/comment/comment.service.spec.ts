import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { CommentEntity } from './comment.entity/comment.entity';
import { UserModule } from '../user/user.module';
import { ServerModule } from '../server/server.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CommentModule } from './comment.module';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { ServerService } from '../server/server.service';
import { CommentController } from './comment.controller';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([CommentEntity]),
        UserModule,
        ServerModule,
        AuthModule,
        JwtModule,
        CommentModule,
      ],
      providers: [
        UserService,
        AuthService,
        ServerService,
        JwtService,
        CommentService,
      ],
      controllers: [CommentController],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
