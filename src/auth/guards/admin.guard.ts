import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserRole } from 'src/user/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role == UserRole.Admin) {
      return true;
    }

    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
