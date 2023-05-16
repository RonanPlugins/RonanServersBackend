import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity/category.entity';
import { Repository } from 'typeorm';
import { ServerService } from '../server/server.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntityRepository: Repository<CategoryEntity>,
    private serverService: ServerService,
  ) {}

  // async createCategory(name: string): Promise<CategoryEntity> {
  //
  // }
}
