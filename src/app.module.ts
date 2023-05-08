import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './host/host.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import config from '../ormconfig';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot(config), HostModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
