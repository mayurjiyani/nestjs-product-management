// src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../repositories/user.repository';
import { JWT_SECRET } from 'src/frameworks/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload) {
    console.log('=====> userId: ', payload['userId']);
    const user = await this.usersRepository.fineOne(payload['userId']);
    console.log('user jwt', user);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
