import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HostModule } from '../host/host.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from '../host/host.entity/host.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HostEntity]),
    HostModule,
    PassportModule,
    JwtModule.register({
      // TODO replace YOUR_SECRET_KEY
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
