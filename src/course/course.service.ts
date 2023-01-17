import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursePhotoService } from 'src/course_photo/course_photo.service';
import { FindOptionsDto } from 'src/utilities/findOptions.dto';
import { unlinkFiles } from 'src/utilities/unlinkFiles';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private coursePhotoService: CoursePhotoService,
  ) {}
  async create(
    createCourseDto: CreateCourseDto,
    files: Array<Express.Multer.File>,
  ) {
    const course = await this.courseRepository.save(createCourseDto);
    await this.coursePhotoService.addPhotos(course.id, files);
    return course;
  }

  async findAll(findOptions: FindOptionsDto) {
    const queryBuilder = this.courseRepository.createQueryBuilder('course');
    const orderBy = findOptions.orderBy ? findOptions.orderBy : 'createdAt';
    const sort = findOptions.sort
      ? findOptions.sort === 'ASC'
        ? 'ASC'
        : 'DESC'
      : 'ASC';
    const page = findOptions.page ? findOptions.page : 1;
    const perPage = findOptions.perPage ? findOptions.perPage : 10;

    queryBuilder
      .orderBy(`course.${orderBy}`, sort)
      .offset((page - 1) * perPage)
      .limit(perPage)
      .leftJoinAndSelect('course.photos', 'photos');
    const total = await queryBuilder.getCount();
    return {
      data: await queryBuilder.getMany(),
      total,
      page,
      numberOfPages: Math.ceil(total / perPage),
    };
  }

  async findOne(id: number) {
    const result = await this.courseRepository.findOne({
      where: { id },
      relations: { photos: true },
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
      relations: { photos: true },
    });
    if (!result) {
      throw new NotFoundException(`course with id: ${id} not found`);
    }
    await this.courseRepository.delete({ id });
    result.photos.map((element) => {
      unlinkFiles(element.url);
    });
    return result;
  }
}
