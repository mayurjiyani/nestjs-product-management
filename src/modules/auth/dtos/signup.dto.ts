import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User Email',
    example: 'example@xyz.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'User name',
    example: 'John Doe',
    type: String,
  })
  name?: string;

  @ApiProperty({
    description: 'User password',
    example: 'ABC@123',
    type: String,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
