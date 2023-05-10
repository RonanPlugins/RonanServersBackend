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
import {
  ApiBody,
  ApiCookieAuth,
  ApiDefaultResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UserEntity } from './user.entity/user.entity';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  @UsePipes(new ValidationPipe())
  @ApiBody({ type: UserEntity })
  @ApiDefaultResponse({
    description: 'Host created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User created successfully' },
        host: { $ref: '#/components/schemas/UserEntity' },
      },
    },
  })
  async register(@Body() body: UserEntity): Promise<any> {
    const host = await this.userService.createUser(
      body.username,
      body.email,
      body.password,
    );
    return { message: 'Host created successfully', host };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiCookieAuth('JWT Token')
  @ApiBody({ type: UserEntity })
  @ApiDefaultResponse({
    description: 'Host created successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Host created successfully' },
        HostEntity: { $ref: '#/components/schemas/UserEntity' },
      },
    },
  })
  async getProfile(@Req() req): Promise<any> {
    const hostEntity = await this.userService.findOneById(req.user.id);
    return { hostEntity };
  }
}
