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
import { ProductPhotoService } from './product_photo.service';
import { CreateProductPhotoDto } from './dto/create-product_photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product_photo.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utilities/filename.utility';

@Controller('product-photo')
export class ProductPhotoController {
  constructor(private readonly productPhotoService: ProductPhotoService) {}

  @Post()
  create(@Body() createProductPhotoDto: CreateProductPhotoDto) {
    return this.productPhotoService.create(createProductPhotoDto);
  }

  @Post('/:productId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  addPhotoToExistingProduct(
    @Param('productId') id: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.productPhotoService.addPhotos(id, files);
  }

  @Get()
  findAll() {
    return this.productPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPhotoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductPhotoDto: UpdateProductPhotoDto,
  ) {
    return this.productPhotoService.update(+id, updateProductPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPhotoService.remove(+id);
  }
}
