import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
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
