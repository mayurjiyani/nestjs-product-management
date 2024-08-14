import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/frameworks/enitites';
import { ROLES } from 'src/frameworks/enums';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async save(payload: Partial<Users>) {
    return this.usersRepository.save(payload);
  }

  async find() {
    return this.usersRepository.findOne({
      where: {
        deletedAt: IsNull(),
        role: ROLES.CUSTOMER,
      },
      select: ['id', 'name', 'email', 'created_at', 'role', 'updated_at'],
    });
  }

  async findOneByEmail(email) {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'name', 'email', 'created_at', 'role', 'updated_at'],
    });
  }

  async fineOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
        role: ROLES.CUSTOMER,
        deletedAt: IsNull(),
      },
      select: ['id', 'name', 'email', 'created_at', 'role', 'updated_at'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id, payload: Partial<Users>) {
    return this.usersRepository.update(id, payload);
  }
}
