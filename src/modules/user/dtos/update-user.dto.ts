// src/user/dto/update-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe Updated',
    description: 'Updated name of the user',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'john.doe.updated@example.com',
    description: 'Updated email of the user',
    required: false,
  })
  email?: string;
}
