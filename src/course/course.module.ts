import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursePhotoModule } from 'src/course_photo/course_photo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), CoursePhotoModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
