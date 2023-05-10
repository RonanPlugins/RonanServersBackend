import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerEntity } from './server.entity/server.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerEntity]),
    JwtModule.register({
      // TODO replace YOUR_SECRET_KEY
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
    UserModule,
    ServerModule,
  ],
  providers: [ServerService, AuthService, UserService],
  controllers: [ServerController],
  exports: [TypeOrmModule, ServerService],
})
export class ServerModule {}
