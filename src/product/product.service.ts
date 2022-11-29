import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductPhotoService } from '../product_photo/product_photo.service';
import { FindOptionsDto } from '../utilities/findOptions.dto';
import { unlinkFiles } from '../utilities/unlinkFiles';

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

  async findAll(findOptions: FindOptionsDto) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    const orderBy = findOptions.orderBy ? findOptions.orderBy : 'createdAt';
    const sort = findOptions.sort
      ? findOptions.sort === 'ASC'
        ? 'ASC'
        : 'DESC'
      : 'ASC';
    const page = findOptions.page ? findOptions.page : 1;
    const perPage = findOptions.perPage ? findOptions.perPage : 10;

    queryBuilder
      .orderBy(`product.${orderBy}`, sort)
      .offset((page - 1) * perPage)
      .limit(perPage)
      .leftJoinAndSelect('product.photos', 'photos');
    const total = await queryBuilder.getCount();
    return {
      data: await queryBuilder.getMany(),
      total,
      page,
      numberOfPages: Math.ceil(total / perPage),
    };
  }

  async findOne(id: number) {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: { photos: true },
    });
    if (!result) {
      throw new NotFoundException(`product with id: ${id} not found`);
    }
    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
    if (productToUpdate) {
      return await this.productRepository.save(productToUpdate);
    }
    throw new NotFoundException(`product with id: ${id} not found`);
  }

  async remove(id: number) {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: { photos: true },
    });
    if (!result) {
      throw new NotFoundException(`product with id: ${id} not found`);
    }
    await this.productRepository.delete({ id });
    result.photos.map((element) => {
      unlinkFiles(element.url);
    });
    return result;
  }
}
