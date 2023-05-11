import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { ServerModule } from '../server/server.module';
import { UserService } from '../user/user.service';
import { ServerService } from '../server/server.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    UserModule,
    ServerModule,
  ],
  providers: [CommentService, UserService, ServerService],
  exports: [TypeOrmModule, CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
