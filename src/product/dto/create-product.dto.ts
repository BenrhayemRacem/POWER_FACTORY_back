import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductAvailabilityEnum } from '../../enums/productAvailability.enum';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsEnum(ProductAvailabilityEnum)
  availability: ProductAvailabilityEnum;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  number: number;
}
