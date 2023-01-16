import { PartialType } from '@nestjs/mapped-types';
import { CreateCoursePhotoDto } from './create-course_photo.dto';

export class UpdateCoursePhotoDto extends PartialType(CreateCoursePhotoDto) {}
