import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find({
      order: {
        lastname: 'ASC',
        id: 'DESC',
      },
    });
    return users;
  }

  async findOne(id: number) {
    const result = await this.userRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (userToUpdate) {
      return await this.userRepository.save(userToUpdate);
    }
    throw new NotFoundException(`user with id: ${id} not found`);
  }

  async remove(id: number) {
    const result = await this.userRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`user with id: ${id} not found`);
    }
    await this.userRepository.delete({ id });
    return result;
  }
}
