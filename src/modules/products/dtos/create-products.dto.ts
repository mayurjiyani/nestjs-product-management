import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Smartphone',
    description: 'The name of the product',
  })
  name: string;

  @ApiProperty({
    example:
      'A high-end smartphone with a powerful processor and excellent camera.',
    description: 'A brief description of the product',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 999.99,
    description: 'The price of the product',
  })
  price: number;
}
