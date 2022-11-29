import { Module } from '@nestjs/common';
import { ProductPhotoService } from './product_photo.service';
import { ProductPhotoController } from './product_photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductPhoto } from './entities/product_photo.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductPhoto, Product])],
  controllers: [ProductPhotoController],
  providers: [ProductPhotoService],
  exports: [ProductPhotoService],
})
export class ProductPhotoModule {}
