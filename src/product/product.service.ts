import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductPhotoService } from '../product_photo/product_photo.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private productPhotoService: ProductPhotoService,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
  ) {
    const product = await this.productRepository.save(createProductDto);
    await this.productPhotoService.addPhotos(product.id, files);
    return product;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    const productToUpdate = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (productToUpdate) {
      await this.productRepository.save(productToUpdate);
    }
    throw new NotFoundException(`product with id: ${id} not found`);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
