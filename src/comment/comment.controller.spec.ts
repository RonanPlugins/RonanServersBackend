import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../ormconfig';
import { UserModule } from '../user/user.module';
import { ServerModule } from '../server/server.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { ServerService } from '../server/server.service';
import { CommentService } from './comment.service';
import { CommentModule } from './comment.module';
import { CommentEntity } from './comment.entity/comment.entity';

describe('CommentController', () => {
  let controller: CommentController;

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
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
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

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
