import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  telephone: number;
}
