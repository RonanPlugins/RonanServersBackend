import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiDefaultResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentEntity } from './comment.entity/comment.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: CommentEntity })
  @ApiDefaultResponse({
    description: 'Comment created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Comment created successfully' },
        host: { $ref: '#/components/schemas/CommentEntity' },
      },
    },
  })
  async register(@Body() body: CommentEntity): Promise<any> {
    const comment = await this.commentService.createComment(
      body.commentText,
      body.user.id,
      body.server.id,
    );
    return { message: 'Host created successfully', comment };
  }
  @Get('server/:serverId')
  @ApiDefaultResponse({
    description: 'Get all comments by server ID',
    schema: {
      type: 'array',
      items: { $ref: '#/components/schemas/CommentEntity' },
    },
  })
  async getCommentsByServerId(
    @Param('serverId') serverId: number,
  ): Promise<CommentEntity[]> {
    return await this.commentService.findAllByServerId(serverId);
  }

  @Get('user/:userId')
  @ApiDefaultResponse({
    description: 'Get all comments by user ID',
    schema: {
      type: 'array',
      items: { $ref: '#/components/schemas/CommentEntity' },
    },
  })
  async getCommentsByUserId(
    @Param('userId') userId: number,
  ): Promise<CommentEntity[]> {
    return await this.commentService.findAllByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('JWT Token')
  @Delete(':id')
  async deleteServer(@Request() req, @Param('id') id: number) {
    const userId = await this.authService.getUserIdFromToken(
      req.headers.authorization,
    );
    const commentEntity = await this.commentService.findOneById(id);
    if (commentEntity.user.id !== userId) {
      throw new UnauthorizedException('Not authorized to delete this comment');
    }
    await this.commentService.deleteComment(id);
    return { message: 'Comment deleted successfully' };
  }
}
