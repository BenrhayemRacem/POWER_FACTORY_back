import { RoleEnum } from 'src/enums/role.enum';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  telephone: number;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
