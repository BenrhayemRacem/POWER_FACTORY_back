import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @Type(() => Number)
  @IsNumber()
  telephone: number;
}
