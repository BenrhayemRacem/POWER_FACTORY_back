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
import { ProductPhotoService } from './product_photo.service';
import { CreateProductPhotoDto } from './dto/create-product_photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product_photo.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from '../utilities/filename.utility';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('product-photo')
export class ProductPhotoController {
  constructor(private readonly productPhotoService: ProductPhotoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  create(@Body() createProductPhotoDto: CreateProductPhotoDto) {
    return this.productPhotoService.create(createProductPhotoDto);
  }

  @Post('/:productId')
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
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateProductPhotoDto: UpdateProductPhotoDto,
  ) {
    return this.productPhotoService.update(+id, updateProductPhotoDto);
  }
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPhotoService.remove(+id);
  }
}
