// src/auth/auth.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { UserRepository } from './repositories/user.repository';
import { compareHash, generateHash } from 'src/frameworks/utility/bycrypt';
import { ROLES } from 'src/frameworks/enums';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userRepository.findOneByEmail(
      signUpDto.email,
    );

    if (existingUser) {
      throw new BadRequestException('user already exists');
    }

    const hashedPin = await generateHash(signUpDto.password);

    const user = await this.userRepository.save({
      email: signUpDto.email,
      password: hashedPin,
      role: ROLES.CUSTOMER,
      name: signUpDto.name,
    });

    return {
      accessToken: await this.generatePayload(user.id, user.role),
      data: {
        userId: user.id,
        role: user.role,
      },
    };
  }

  async generatePayload(userId: number, role: string) {
    return this.jwtService.sign({
      role: role,
      userId: userId,
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOneByEmail(loginDto.email);
    console.log('user:', user);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const isPasswordValid = await compareHash(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('invalid credentials');
    }

    return {
      accessToken: await this.generatePayload(user.id, user.role),
      data: {
        userId: user.id,
        role: user.role,
      },
    };
  }
}
