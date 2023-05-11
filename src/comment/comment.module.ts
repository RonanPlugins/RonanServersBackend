import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { ServerModule } from '../server/server.module';
import { UserService } from '../user/user.service';
import { ServerService } from '../server/server.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserModule,
    ServerModule,
    AuthModule,
    JwtModule,
  ],
  providers: [
    CommentService,
    UserService,
    ServerService,
    AuthService,
    JwtService,
  ],
  exports: [TypeOrmModule, CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
