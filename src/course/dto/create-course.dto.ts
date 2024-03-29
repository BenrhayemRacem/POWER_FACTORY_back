import { IsString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  description :string ;

  @IsString()
  name:string;

  @IsString()
  date:string;

  @IsString()
  time:string;

}
