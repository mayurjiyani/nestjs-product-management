// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './products.service';
import { Products, Users } from 'src/frameworks/enitites';
import { ProductController } from './products.controller';
import { ProductRepository } from './repositories/products.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Users, Products])],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductsModule {}
