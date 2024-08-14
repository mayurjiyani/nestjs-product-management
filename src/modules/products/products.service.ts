import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './repositories/products.repository';
import { CreateProductDto } from './dtos/create-products.dto';
import { Users } from 'src/frameworks/enitites';
import { UpdateProductDto } from './dtos/update-products.dto';
import { GetProductDto } from './dtos/get-product.dto';
import { ProductType } from 'src/frameworks/enums';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(createProductDto: CreateProductDto, user: Users) {
    const existingProduct = await this.productRepository.findByName(
      createProductDto.name,
    );
    console.log('product', existingProduct);
    if (existingProduct) {
      throw new BadRequestException('Product is Already Exist');
    }

    const product = await this.productRepository.save({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      userId: user.id,
    });

    return {
      success: true,
      message: 'create sucessfully',
      data: product,
    };
  }

  async findProducts(getProductDto: GetProductDto) {
    let products;
    if (getProductDto.type === ProductType.All) {
      products = await this.productRepository.find();
    }
    if (getProductDto.type === ProductType.Approved) {
      products = await this.productRepository.findApprovedProducts();
    }
    if (getProductDto.type === ProductType.Deleted) {
      products = await this.productRepository.findDeletedProducts();
    }
    return {
      success: true,
      message: 'retrive products sucessfully',
      data: products,
    };
  }

  async findById(id: number) {
    const product = await this.productRepository.findOne(id);
    return {
      success: true,
      message: 'retrive product sucessfully',
      data: product,
    };
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    await this.productRepository.update(product.id, updateProductDto);
    return {
      success: true,
      message: 'update successfully',
    };
  }

  async approveProduct(id: number) {
    const product = await this.productRepository.findOne(id);
    await this.productRepository.update(product.id, {
      isVisible: true,
    });

    return {
      success: true,
      message: 'sucessfully approved',
    };
  }

  async disableProduct(id: number) {
    const product = await this.productRepository.findOne(id);
    await this.productRepository.update(product.id, {
      isVisible: false,
    });

    return {
      success: true,
      message: 'sucessfully disable',
    };
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne(id);

    await this.productRepository.update(product.id, {
      deletedAt: new Date(),
    });

    return {
      success: true,
      message: 'sucessfully delete',
    };
  }
}
