import { Module } from '@nestjs/common';
import { CoursePhotoService } from './course_photo.service';
import { CoursePhotoController } from './course_photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursePhoto } from './entities/course_photo.entity';
import { Course } from 'src/course/entities/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoursePhoto, Course])],
  controllers: [CoursePhotoController],
  providers: [CoursePhotoService],
})
export class CoursePhotoModule {}
