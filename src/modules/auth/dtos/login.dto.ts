import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User Email',
    example: 'example@xyz.com',
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'ABC@123',
    type: String,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
