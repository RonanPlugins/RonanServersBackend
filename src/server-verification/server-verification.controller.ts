import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServerVerificationService } from './server-verification.service';
import { ServerVerificationEntity } from './server-verification.entity/server-verification.entity';

@Controller('server-verification')
@ApiTags('server-verification')
export class ServerVerificationController {
  constructor(
    private readonly serverVerificationService: ServerVerificationService,
  ) {}

  @Post()
  async create(
    @Param('serverId') serverId: number,
  ): Promise<ServerVerificationEntity> {
    return this.serverVerificationService.create(serverId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServerVerificationEntity> {
    return this.serverVerificationService.findOne(id);
  }

  @Patch(':id')
  async verify(@Param('id') id: string): Promise<ServerVerificationEntity> {
    return this.serverVerificationService.verify(id);
  }
}
