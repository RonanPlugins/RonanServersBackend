import { Injectable } from '@nestjs/common';
import { HostService } from '../host/host.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private hostService: HostService,
    private jwtService: JwtService,
  ) {}

  async validateHost(username: string, password: string): Promise<any> {
    const host = await this.hostService.findOneByUsername(username);
    if (host && (await bcrypt.compare(password, host.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = host;
      return result;
    }
    return null;
  }

  async login(host: any) {
    const payload = { username: host.username, id: host.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}