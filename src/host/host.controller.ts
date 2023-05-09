import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HostService } from './host.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HostEntity } from './host.entity/host.entity';
import {
  ApiBody,
  ApiCookieAuth,
  ApiDefaultResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('host')
@ApiTags('host')
export class HostController {
  constructor(private hostService: HostService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: HostEntity })
  @ApiDefaultResponse({
    description: 'Host created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Host created successfully' },
        host: { $ref: '#/components/schemas/HostEntity' },
      },
    },
  })
  async register(@Body() body: HostEntity): Promise<any> {
    const host = await this.hostService.createHost(
      body.username,
      body.email,
      body.password,
    );
    return { message: 'Host created successfully', host };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiCookieAuth('JWT Token')
  @ApiBody({ type: HostEntity })
  @ApiDefaultResponse({
    description: 'Host created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Host created successfully' },
        HostEntity: { $ref: '#/components/schemas/HostEntity' },
      },
    },
  })
  async getProfile(@Req() req): Promise<any> {
    const hostEntity = await this.hostService.findOneById(req.user.id);
    return { hostEntity };
  }
}
