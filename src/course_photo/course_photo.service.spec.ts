import { Test, TestingModule } from '@nestjs/testing';
import { CoursePhotoService } from './course_photo.service';

describe('CoursePhotoService', () => {
  let service: CoursePhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePhotoService],
    }).compile();

    service = module.get<CoursePhotoService>(CoursePhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
