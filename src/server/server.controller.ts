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
import { HostService } from '../host/host.service';
import { ServerEntity } from './server.entity/server.entity';
import { ApiBody, ApiDefaultResponse, ApiTags } from '@nestjs/swagger';

@Controller('server')
@ApiTags('server')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private hostService: HostService,
    private authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiBody({ type: ServerEntity })
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        host: { $ref: '#/components/schemas/ServerEntity' },
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
    const hostId = this.authService.getHostIdFromToken(req?.cookies?.token);
    const server = await this.serverService.createServer(
      name,
      description,
      ipAddress,
      port,
      version,
      gameMode,
      rules,
      await hostId,
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
  @Get('host/:hostId')
  async findAllByHostId(@Param('hostId') hostId: number) {
    return await this.serverService.findAllByHostId(hostId);
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
        host: { $ref: '#/components/schemas/ServerEntity' },
      },
    },
  })
  async findOneById(@Param('id') id: number) {
    return await this.serverService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiDefaultResponse({
    schema: {
      type: 'object',
      properties: {
        host: { $ref: '#/components/schemas/ServerEntity' },
      },
    },
  })
  async updateServer(
    @Request() req,
    @Param('id') id: number,
    @Body() updateServerDto: Partial<ServerEntity>,
  ) {
    const hostId = await this.authService.getHostIdFromToken(
      req.headers.authorization,
    );
    const server = await this.serverService.findOneById(id);
    if (server.hostId !== hostId) {
      throw new UnauthorizedException('Not authorized to update this server');
    }
    return await this.serverService.updateServer(id, updateServerDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteServer(@Request() req, @Param('id') id: number) {
    const hostId = await this.authService.getHostIdFromToken(
      req.headers.authorization,
    );
    const server = await this.serverService.findOneById(id);
    if (server.hostId !== hostId) {
      throw new UnauthorizedException('Not authorized to delete this server');
    }
    await this.serverService.deleteServer(id);
    return { message: 'Server deleted successfully' };
  }
}
