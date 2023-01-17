import { CoursePhoto } from 'src/course_photo/entities/course_photo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from "../../utilities/timestamp.entity";

@Entity()
export class Course extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => CoursePhoto, (e) => e.course)
  photos: CoursePhoto[];
}
