import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
  IsPositive,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Smartphone',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    example:
      'A high-end smartphone with a powerful processor and excellent camera.',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    example: 999.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;
}
