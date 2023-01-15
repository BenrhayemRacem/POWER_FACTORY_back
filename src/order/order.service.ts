import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {}

  findAll() {}

  findOne(id: number) {}

  update(id: number, updateOrderDto: UpdateOrderDto) {}

  remove(id: number) {}
}
