import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timestamp } from '../../utilities/timestamp.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class ProductPhoto extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Product, (e) => e.photos)
  product: Product;
}
