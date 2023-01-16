import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdersProducts } from './order-products.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 50 })
  adress: string;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column({ length: 25 })
  date: string;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @Column()
  userId: number;

  @OneToMany(
    () => OrdersProducts,
    (OrdersProducts: OrdersProducts) => OrdersProducts.order,
  )
  OrdersProducts: OrdersProducts[];
}
