import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerVerificationEntity } from './server-verification.entity/server-verification.entity';
import { ServerModule } from '../server/server.module';
import { ServerVerificationService } from './server-verification.service';
import { ServerVerificationController } from './server-verification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServerVerificationEntity]), ServerModule],
  providers: [ServerVerificationService],
  controllers: [ServerVerificationController],
  exports: [TypeOrmModule, ServerVerificationService],
})
export class ServerVerificationModule {}
