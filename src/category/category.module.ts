import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ServerModule } from '../server/server.module';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ServerService } from '../server/server.service';
import { AuthService } from '../auth/auth.service';
import { CategoryEntity } from './category.entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    UserModule,
    ServerModule,
    AuthModule,
    JwtModule,
  ],
  providers: [
    CategoryService,
    UserService,
    ServerService,
    AuthService,
    JwtService,
  ],
  exports: [TypeOrmModule, CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
