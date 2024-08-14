// src/user/user.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Users } from 'src/frameworks/enitites/user.entity';
import { JwtAuthGuard } from 'src/frameworks/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { Role } from 'src/frameworks/decorators/role.decorator';
import { ROLES } from 'src/frameworks/enums';
import { RolesGuard } from 'src/frameworks/guards/role-auth.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Retrieve all users' })
  @Get()
  @ApiResponse({
    status: 200,
    type: [Users],
  })
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  @ApiResponse({
    status: 200,
    type: Users,
  })
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user by ID (Admin only)' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: Users,
  })
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user by ID (Admin only)' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  @Role(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
