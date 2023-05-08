import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from './host.entity/host.entity';
import { HostController } from './host.controller';
import { HostService } from './host.service';

@Module({
  imports: [TypeOrmModule.forFeature([HostEntity])],
  providers: [HostService],
  exports: [TypeOrmModule, HostService],
  controllers: [HostController],
})
export class HostModule {}
