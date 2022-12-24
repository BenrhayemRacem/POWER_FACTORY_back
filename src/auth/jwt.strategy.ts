import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from './interfaces/payload.interface';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //TODO : debug configuration service
      //   secretOrKey: configService.get('JWT_SECRET'),
      secretOrKey: 'El_Hanouta_Secret',
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.userRepository.findOneBy({
      username: payload.username,
    });
    if (user) {
      const { password, salt, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }
}
