import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ServerService } from './server.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ServerEntity } from './server.entity/server.entity';
import {
  ApiBody,
  ApiCookieAuth,
  ApiDefaultResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@Controller('server')
@ApiTags('server')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBody({ type: ServerEntity })
  @ApiCookieAuth('JWT Token')
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/ServerEntity' },
      },
    },
  })
  async create(
    @Request() req,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('ipAddress') ipAddress: string,
    @Body('port') port: number,
    @Body('version') version: string,
    @Body('gameMode') gameMode: string,
    @Body('rules') rules: string[],
    @Body('categoryId') categoryId: number,
  ) {
    const userId = this.authService.getUserIdFromToken(req?.cookies?.token);
    const server = await this.serverService.createServer(
      name,
      description,
      ipAddress,
      port,
      version,
      gameMode,
      rules,
      await userId,
      categoryId,
    );
    return { message: 'Server created successfully', server };
  }

  @Get()
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        servers: {
          type: 'array',
          items: { $ref: '#/components/schemas/ServerEntity' },
        },
      },
    },
  })
  async findAll(): Promise<ServerEntity[]> {
    return await this.serverService.findAll();
  }
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        servers: {
          type: 'array',
          items: { $ref: '#/components/schemas/ServerEntity' },
        },
      },
    },
  })
  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: number) {
    return await this.serverService.findAllByUserId(userId);
  }
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        servers: {
          type: 'array',
          items: { $ref: '#/components/schemas/ServerEntity' },
        },
      },
    },
  })
  @Get('category/:categoryId')
  async findAllByCategoryId(@Param('categoryId') categoryId: number) {
    return await this.serverService.findAllByCategoryId(categoryId);
  }

  @Get(':id')
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/ServerEntity' },
      },
    },
  })
  async findOneById(@Param('id') id: number) {
    return await this.serverService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('JWT Token')
  @Patch(':id')
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        user: { $ref: '#/components/schemas/ServerEntity' },
      },
    },
  })
  async updateServer(
    @Request() req,
    @Param('id') id: number,
    @Body() updateServerDto: Partial<ServerEntity>,
  ) {
    const userId = await this.authService.getUserIdFromToken(
      req.headers.authorization,
    );
    const server = await this.serverService.findOneById(id);
    if (server.userId !== userId) {
      throw new UnauthorizedException('Not authorized to update this server');
    }
    return await this.serverService.updateServer(id, updateServerDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('JWT Token')
  @Delete(':id')
  async deleteServer(@Request() req, @Param('id') id: number) {
    const userId = await this.authService.getUserIdFromToken(
      req.headers.authorization,
    );
    const server = await this.serverService.findOneById(id);
    if (server.userId !== userId) {
      throw new UnauthorizedException('Not authorized to delete this server');
    }
    await this.serverService.deleteServer(id);
    return { message: 'Server deleted successfully' };
  }
}
