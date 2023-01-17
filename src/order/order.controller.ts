import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "../auth/guards/admin.guard";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards( AuthGuard('jwt'), JwtAuthGuard)
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    console.log(req.user)
    return this.orderService.create(req.user.id, createOrderDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt') , JwtAuthGuard)
  async update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.orderService.remove(id);
  }
  
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Get()
  async getAll(){
      return this.orderService.findAll()
  }
}
