import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/course/entities/course.entity';
import { unlinkFiles } from 'src/utilities/unlinkFiles';
import { Repository } from 'typeorm';
import { CreateCoursePhotoDto } from './dto/create-course_photo.dto';
import { UpdateCoursePhotoDto } from './dto/update-course_photo.dto';
import { CoursePhoto } from './entities/course_photo.entity';

@Injectable()
export class CoursePhotoService {
  constructor(
    @InjectRepository(CoursePhoto)
    private coursePhotoRepository: Repository<CoursePhoto>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async addPhotos(courseId: number, files: Array<Express.Multer.File>) {
    const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new NotFoundException(`course with id: ${courseId} not found`);
    }
    const photos = files.map((element) => {
      const photo = new CoursePhoto();
      photo.course = course;
      photo.url = element.filename;
      return photo;
    });
    return await this.coursePhotoRepository.save(photos);
  }
  create(createCoursePhotoDto: CreateCoursePhotoDto) {}

  findAll() {
    return `This action returns all coursePhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coursePhoto`;
  }

  update(id: number, updateCoursePhotoDto: UpdateCoursePhotoDto) {
    return `This action updates a #${id} coursePhoto`;
  }

  async remove(id: number) {
    const photo = await this.coursePhotoRepository.findOneBy({ id });
    if (!photo) {
      throw new NotFoundException(`no photo exists with id: ${id}`);
    }
    const result = await this.coursePhotoRepository.delete({ id });
    const filename = photo.url;
    unlinkFiles(filename);
    return result;
  }
}
