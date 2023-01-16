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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminGuard } from 'src/auth/guards/admin.guard';
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateCoursePhotoDto: UpdateCoursePhotoDto,
  ) {
    return this.coursePhotoService.update(+id, updateCoursePhotoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  remove(@Param('id') id: string) {
    return this.coursePhotoService.remove(+id);
  }
}
