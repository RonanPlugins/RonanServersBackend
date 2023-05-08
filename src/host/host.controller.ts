import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { HostService } from './host.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('host')
export class HostController {
  constructor(private hostService: HostService) {}
  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    const host = await this.hostService.createHost(username, email, password);
    return { message: 'Host created successfully', host };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<any> {
    const user = await this.hostService.findOneById(req.user.id);
    return { user };
  }
}
