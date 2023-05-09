import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ServerService } from './server.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { HostService } from '../host/host.service';

@Controller('server')
export class ServerController {
  constructor(
    private serverService: ServerService,
    private hostService: HostService,
    private authService: AuthService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body('name') name: string,
    @Body('description') description: string,
    @Body('ipAddress') ipAddress: string,
    @Body('port') port: number,
    @Body('version') version: string,
    @Body('gameMode') gameMode: string,
    @Body('playerCapacity') playerCapacity: number,
    @Body('onlinePlayers') onlinePlayers: number,
    @Body('rules') rules: string[],
    @Body('categoryId') categoryId: number,
  ) {
    const hostId = this.authService.getHostIdFromToken(
      req.headers.authorization,
    );
    const server = await this.serverService.createServer(
      name,
      description,
      ipAddress,
      port,
      version,
      gameMode,
      playerCapacity,
      onlinePlayers,
      rules,
      await hostId,
      categoryId,
    );
    return { message: 'Server created successfully', server };
  }
}
