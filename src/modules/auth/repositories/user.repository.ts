import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/frameworks/enitites';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async save(payload: Partial<Users>) {
    return this.usersRepository.save(payload);
  }

  async findOneByEmail(email) {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  fineOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
