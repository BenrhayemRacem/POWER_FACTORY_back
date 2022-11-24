import { Test, TestingModule } from '@nestjs/testing';
import { ProductPhotoController } from './product_photo.controller';
import { ProductPhotoService } from './product_photo.service';

describe('ProductPhotoController', () => {
  let controller: ProductPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductPhotoController],
      providers: [ProductPhotoService],
    }).compile();

    controller = module.get<ProductPhotoController>(ProductPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
