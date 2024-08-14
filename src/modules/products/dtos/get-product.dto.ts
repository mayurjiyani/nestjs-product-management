import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProductType } from 'src/frameworks/enums';

export class GetProductDto {
  @ApiProperty({
    enum: ProductType,
    example: ProductType.All,
  })
  @IsEnum([ProductType])
  type: ProductType;
}
