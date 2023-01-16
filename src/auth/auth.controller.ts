import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  SignUp(@Body() userData: SignUpDto): Promise<User> {
    return this.authService.signUp(userData);
  }
  @Post('log-in')
  LogIn(@Body() userData: LoginDto) {
    return this.authService.logIn(userData);
  }
}
