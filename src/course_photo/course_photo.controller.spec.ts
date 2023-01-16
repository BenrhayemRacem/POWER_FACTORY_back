import { Test, TestingModule } from '@nestjs/testing';
import { CoursePhotoController } from './course_photo.controller';
import { CoursePhotoService } from './course_photo.service';

describe('CoursePhotoController', () => {
  let controller: CoursePhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursePhotoController],
      providers: [CoursePhotoService],
    }).compile();

    controller = module.get<CoursePhotoController>(CoursePhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
