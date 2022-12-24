import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  SignUp(@Body() userData: SignUpDto): Promise<User> {
    return this.authService.signUp(userData);
  }
}
