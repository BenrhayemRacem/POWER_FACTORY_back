import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

interface ProductOrder {
  product: Product;
  quantity: number;
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  totalPrice: Number;
  @Column()
  created: Date;
}
