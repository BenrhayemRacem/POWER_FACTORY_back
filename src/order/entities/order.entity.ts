import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

interface ProductOrder {
  product: Product;
  quantity: number;
}
export class Order {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  owner: User;
  @Column()
  totalPrice: Number;
  @Column()
  products: ProductOrder[];
  @Column()
  created: Date;
}
