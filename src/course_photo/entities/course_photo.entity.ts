import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class CoursePhoto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Course, (e) => e.photos, {
    onDelete: 'CASCADE',
  })
  course: Course;
}
