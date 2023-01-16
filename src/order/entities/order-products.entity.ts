import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { Order } from './order.entity';

@Entity()
export class OrdersProducts {
  @PrimaryColumn()
  orderId: number;

  @ManyToOne((type) => Order, (order) => order.OrdersProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @PrimaryColumn()
  productId: Number;

  @ManyToOne((type) => Product, (product) => product.OrdersProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
