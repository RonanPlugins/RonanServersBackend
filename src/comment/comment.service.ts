import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity/comment.entity';
import { ServerService } from '../server/server.service';
import { UserService } from '../user/user.service';
import { ServerEntity } from '../server/server.entity/server.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
    private userService: UserService,
    private serverService: ServerService,
  ) {}

  async createComment(
    commentText: string,
    userId: number,
    serverId: number,
  ): Promise<CommentEntity> {
    const commentEntity: CommentEntity = new CommentEntity();
    commentEntity.commentText = commentText;
    commentEntity.user = await this.userService.findOneById(userId);
    commentEntity.server = await this.serverService.findOneById(serverId);
    return await this.commentEntityRepository.save(commentEntity);
  }
  async findOneByCommentText(commentText: string): Promise<CommentEntity> {
    return await this.commentEntityRepository.findOne({
      where: { commentText },
    });
  }
  async findAllByUserId(userId: number): Promise<CommentEntity[]> {
    return await this.commentEntityRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findAllByServerId(serverId: number): Promise<CommentEntity[]> {
    return await this.commentEntityRepository.find({
      where: { server: { id: serverId } },
    });
  }

  async findOneById(id: number): Promise<CommentEntity> {
    return await this.commentEntityRepository.findOne({ where: { id } });
  }

  async findAll(
    options: FindManyOptions = undefined,
  ): Promise<CommentEntity[]> {
    return await this.commentEntityRepository.find(options);
  }

  async deleteComment(id: number): Promise<void> {
    await this.commentEntityRepository.delete(id);
  }
}
