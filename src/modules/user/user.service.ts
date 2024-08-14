// src/user/user.service.ts
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/frameworks/enitites/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findAll() {
    const users = await this.userRepository.find();
    return {
      success: true,
      message: 'retrive all users',
      data: users,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.fineOne(id);

    return {
      success: true,
      message: 'retrive user',
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.fineOne(id);
    await this.userRepository.update(user.id, updateUserDto);
    return {
      success: true,
      message: 'update successfully',
    };
  }

  async remove(id: number) {
    const user = await this.userRepository.fineOne(id);
    await this.userRepository.update(user.id, {
      deletedAt: new Date(),
    });
    return {
      success: true,
      message: 'sucessfully delete',
    };
  }
}
