import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ServerVerificationService } from './server-verification.service';
import { ServerVerificationEntity } from './server-verification.entity/server-verification.entity';
import { ServerVerificationDto } from './server-verification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('server-verification')
@ApiTags('server-verification')
export class ServerVerificationController {
  constructor(
    private readonly serverVerificationService: ServerVerificationService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() serverVerificationDto: ServerVerificationDto,
  ): Promise<ServerVerificationEntity> {
    return this.serverVerificationService.create(
      serverVerificationDto.serverId,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServerVerificationEntity> {
    return this.serverVerificationService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  async verify(@Param('id') id: string): Promise<ServerVerificationEntity> {
    return this.serverVerificationService.verify(id);
  }
}
