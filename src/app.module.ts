import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server/server.module';
import { CategoryModule } from './category/category.module';
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
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ServerVerificationController } from './server-verification/server-verification.controller';
import { ServerVerificationModule } from './server-verification/server-verification.module';
import { ServerVerificationService } from './server-verification/server-verification.service';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PrometheusModule.register(),
    AuthModule,
    ServerModule,
    CategoryModule,
    UserModule,
    ServerVerificationModule,
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [
    AppController,
    ServerController,
    UserController,
    ServerVerificationController,
    CategoryController,
  ],
  providers: [
    AppService,
    ServerService,
    UserService,
    ServerVerificationService,
    CategoryService,
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
  ],
})
export class AppModule {}
