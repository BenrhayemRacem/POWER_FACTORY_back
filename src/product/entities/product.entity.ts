import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timestamp } from '../../utilities/timestamp.entity';
import { ProductAvailabilityEnum } from '../../enums/productAvailability.enum';
import { ProductPhoto } from '../../product_photo/entities/product_photo.entity';
import { OrdersProducts } from 'src/order/entities/order-products.entity';

@Entity()
export class Product extends Timestamp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ProductAvailabilityEnum,
  })
  availability: ProductAvailabilityEnum;

  @Column()
  number: number;

  @Column()
  brand: string;

  @OneToMany(() => ProductPhoto, (e) => e.product)
  photos: ProductPhoto[];
  @OneToMany(
    () => OrdersProducts,
    (OrdersProducts: OrdersProducts) => OrdersProducts.product,
  )
  OrdersProducts: OrdersProducts[];
}
