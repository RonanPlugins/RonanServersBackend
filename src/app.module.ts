import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server/server.module';
import { CategoryModule } from './category/category.module';
import { RatingService } from './rating/rating.service';
import { CommentModule } from './comment/comment.module';
import { VoteController } from './vote/vote.controller';
import * as dotenv from 'dotenv';
import config from '../ormconfig';
import { ServerService } from './server/server.service';
import { ServerController } from './server/server.controller';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PrometheusModule.register(),
    AuthModule,
    ServerModule,
    CategoryModule,
    CommentModule,
    UserModule,
  ],
  controllers: [
    AppController,
    VoteController,
    ServerController,
    UserController,
  ],
  providers: [
    AppService,
    RatingService,
    ServerService,
    UserService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
