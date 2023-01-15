import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utilities/filename.utility';
import { CoursePhotoService } from './course_photo.service';
import { CreateCoursePhotoDto } from './dto/create-course_photo.dto';
import { UpdateCoursePhotoDto } from './dto/update-course_photo.dto';

@Controller('course-photo')
export class CoursePhotoController {
  constructor(private readonly coursePhotoService: CoursePhotoService) {}

  @Post()
  create(@Body() createCoursePhotoDto: CreateCoursePhotoDto) {
    return this.coursePhotoService.create(createCoursePhotoDto);
  }
  @Post('/:courseId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  addPhotoToExistingProduct(
    @Param('courseId') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.coursePhotoService.addPhotos(id, files);
  }
  @Get()
  findAll() {
    return this.coursePhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursePhotoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoursePhotoDto: UpdateCoursePhotoDto,
  ) {
    return this.coursePhotoService.update(+id, updateCoursePhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursePhotoService.remove(+id);
  }
}
