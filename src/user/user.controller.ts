import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
