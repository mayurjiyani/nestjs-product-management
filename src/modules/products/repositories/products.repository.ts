import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products, Users } from 'src/frameworks/enitites';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
  ) {}

  async findByName(name: string) {
    return this.productRepository.findOne({
      where: {
        name: name,
        deletedAt: IsNull(),
      },
    });
  }

  async save(payload: Partial<Products>) {
    return this.productRepository.save(payload);
  }

  async findApprovedProducts() {
    return this.productRepository.find({
      where: {
        isVisible: true,
        deletedAt: IsNull(),
      },
    });
  }
  async findDeletedProducts() {
    return this.productRepository.find({
      where: {
        deletedAt: Not(IsNull()),
      },
    });
  }

  async find() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        deletedAt: IsNull(),
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id, payload: Partial<Products>) {
    return this.productRepository.update(id, payload);
  }
}
