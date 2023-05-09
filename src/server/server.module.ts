import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerEntity } from './server.entity/server.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { HostModule } from '../host/host.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity]),
    JwtModule.register({
      // TODO replace YOUR_SECRET_KEY
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    HostModule,
  ],
  providers: [ServerService, AuthService],
  controllers: [ServerController],
  exports: [TypeOrmModule, ServerService],
})
export class ServerModule {}
