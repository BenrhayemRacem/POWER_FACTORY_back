import { IsNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsNumber()
  telephone: number;
}
