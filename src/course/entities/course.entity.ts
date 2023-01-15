import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Course {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
