import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from '../enums/role.enum';
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

  @Column()
  role: UserRole;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
