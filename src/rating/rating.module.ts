import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';

@Module({
  controllers: [RatingController]
})
export class RatingModule {}
