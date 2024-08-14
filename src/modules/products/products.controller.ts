import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  Request,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Products, Users } from 'src/frameworks/enitites';
import { JwtAuthGuard } from 'src/frameworks/guards/jwt-auth.guard';
import { CreateProductDto } from './dtos/create-products.dto';
import { ProductService } from './products.service';
import { User } from 'src/frameworks/decorators/user.decorator';
import { UpdateProductDto } from './dtos/update-products.dto';
import { Role } from 'src/frameworks/decorators/role.decorator';
import { ROLES } from 'src/frameworks/enums';
import { RolesGuard } from 'src/frameworks/guards/role-auth.guard';
import { GetProductDto } from './dtos/get-product.dto';

@ApiTags('products')
@Controller('products')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  @ApiResponse({
    status: 201,
    type: Products,
  })
  @Role(ROLES.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(
    @Body() createProductDto: CreateProductDto,
    @User() user: Users,
  ) {
    return this.productService.createProduct(createProductDto, user);
  }

  @ApiOperation({ summary: 'Retrieve all approved products' })
  @Get()
  @ApiResponse({
    status: 200,
    type: [Products],
  })
  @HttpCode(HttpStatus.OK)
  async findProducts(@Query() getProductDto: GetProductDto) {
    return this.productService.findProducts(getProductDto);
  }

  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Products,
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Products,
  })
  @Patch(':id')
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
  })
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @ApiOperation({ summary: 'Approve a product by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully approved',
    type: Products,
  })
  @Patch(':id/approve')
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async approveProduct(@Param('id') id: number) {
    return this.productService.approveProduct(id);
  }

  @ApiOperation({ summary: 'disable a product by ID' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    type: Products,
  })
  @Patch(':id/disable')
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async disableProduct(@Param('id') id: number) {
    return this.productService.disableProduct(id);
  }
}
