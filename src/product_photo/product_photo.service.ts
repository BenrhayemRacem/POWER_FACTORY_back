import { Injectable } from '@nestjs/common';
import { CreateProductPhotoDto } from './dto/create-product_photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product_photo.dto';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPhoto } from './entities/product_photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductPhotoService {
  constructor(
    @InjectRepository(ProductPhoto)
    private productPhotoRepository: Repository<ProductPhoto>,
  ) {}

  async addPhotos(product: Product, files: Array<Express.Multer.File>) {
    const photos = files.map((element) => {
      const photo = new ProductPhoto();
      photo.product = product;
      photo.url = element.filename;
      return photo;
    });
    await this.productPhotoRepository.save(photos);
  }

  create(createProductPhotoDto: CreateProductPhotoDto) {
    return 'This action adds a new productPhoto';
  }

  findAll() {
    return `This action returns all productPhoto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productPhoto`;
  }

  update(id: number, updateProductPhotoDto: UpdateProductPhotoDto) {
    return `This action updates a #${id} productPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} productPhoto`;
  }
}
