// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'customer',
    description: 'Role of the user',
    default: 'customer',
  })
  role: string;
}
