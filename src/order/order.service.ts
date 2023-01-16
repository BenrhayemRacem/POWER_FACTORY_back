import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProductDto } from 'src/product/dto/update-product.dto';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto, ProductDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersProducts } from './entities/order-products.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrdersProducts)
    private readonly ordersProductsRepository: Repository<OrdersProducts>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findAllByUserId(id: number) {
    const orders = await this.orderRepository.find({
      where: {
        user: { id },
      },
    });

    if (!orders) {
      throw new NotFoundException(`This user doesn't have any orders`);
    }

    return orders;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException(`Order under this id doesn't exist`);
    }

    return order;
  }

  async findManyByIds() {}
  async create(userId: number, createOrderDto: CreateOrderDto) {
    const productsDto = createOrderDto.products;
    const userExists = await this.userService.findOne(userId);
    if (!userExists) {
      throw new NotFoundException(`User with this id doesn't exist`);
    }
    const productsIds = productsDto.map((current) => current.id);
    const productsMap = this.createProductQuantityMap(productsDto);

    const products = await this.productService.findManyByIds(productsIds);
    const price = await this.getTotalPrice(products, productsMap);

    const order = await this.orderRepository.create({
      ...createOrderDto,
      userId,
      price,
    });

    const savedOrder = await this.orderRepository.save(order);

    const ordersProducts = products.map((product) => ({
      orderId: savedOrder.id,
      productId: product.id,
      quantity: productsMap.get(product.id),
    }));

    await this.ordersProductsRepository.save(ordersProducts);
  }

  private createProductQuantityMap(productsDto: Array<ProductDto>) {
    const productsMap = new Map<number, number>(); //productId -> quantity

    for (const product of productsDto) {
      const { id, quantity } = product;

      productsMap.set(id, quantity);
    }

    return productsMap;
  }

  private async getTotalPrice(
    products: Array<Product>,
    productsMap: Map<number, number>,
  ) {
    const price = products.reduce(
      (sum, current) => sum + +current.price * productsMap.get(current.id),
      0,
    );

    return price;
  }
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`There is no order under id ${id}`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);

    return this.orderRepository.remove(order);
  }
}
