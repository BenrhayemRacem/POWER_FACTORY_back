import { CoursePhoto } from 'src/course_photo/entities/course_photo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
  

  @OneToMany(() => CoursePhoto, (e) => e.course)
  photos: CoursePhoto[];
}
