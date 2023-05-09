import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HostModule } from './host/host.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server/server.module';
import { CategoryModule } from './category/category.module';
import { RatingService } from './rating/rating.service';
import { CommentModule } from './comment/comment.module';
import { VoteController } from './vote/vote.controller';
import * as dotenv from 'dotenv';
import config from '../ormconfig';
import { HostService } from './host/host.service';
import { ServerService } from './server/server.service';
import { ServerController } from './server/server.controller';
import { HostController } from './host/host.controller';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";


dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PrometheusModule.register(),
    HostModule,
    AuthModule,
    ServerModule,
    CategoryModule,
    CommentModule,
  ],
  controllers: [
    AppController,
    VoteController,
    ServerController,
    HostController,
  ],
  providers: [AppService, RatingService, HostService, ServerService],
})
export class AppModule {}
