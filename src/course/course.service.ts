import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    const course = await this.courseRepository.save(createCourseDto);
    return course;
  }

  async findAll() {
    const courses = await this.courseRepository.find({
      order: {
        id: 'DESC',
      },
    });
    return courses;
  }

  async findOne(id: number) {
    const result = await this.courseRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`course with id: ${id} not found`);
    }
    return result;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const courseToUpdate = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });
    if (courseToUpdate) {
      return await this.courseRepository.save(courseToUpdate);
    }
    throw new NotFoundException(`course with id: ${id} not found`);
  }

  async remove(id: number) {
    const result = await this.courseRepository.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException(`course with id: ${id} not found`);
    }
    await this.courseRepository.delete({ id });
    return result;
  }
}
