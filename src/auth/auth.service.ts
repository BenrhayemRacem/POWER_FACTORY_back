import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(userData: SignUpDto): Promise<User> {
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException('possible duplicate username entry');
    }
    return user;
  }
  async logIn(userData: LoginDto) {
    const { username, password } = userData;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new ConflictException('invalid username or password');
    }
    const hash = await bcrypt.hash(password, user.salt);
    if (hash === user.password) {
      const payload = {
        username: user.username,
        role: user.role,
        id: user.id,
        expiresIn: "30d",
      };

      const jwt = await this.jwtService.sign(payload);
      return {
        access_token: jwt,
        role: user.role
      };
    } else {
      throw new NotFoundException('invalid username or password');
    }
  }
}
