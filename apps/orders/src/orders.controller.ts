/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';

@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
  @Get()
  getOrders() {
    return this.ordersService.getOrders();
  }
  @Get('/:orderId')
  getOrderById(@Param('orderId') orderId: string) {
  return this.ordersService.getOrderById(orderId);
}

@Put('/:orderId')
updateOrder(
  @Param('orderId') orderId: string, 
  @Body() updateOrderDto: UpdateOrderDto
) {
  return this.ordersService.updateOrder(orderId, updateOrderDto);
}

@Delete('/:orderId')
deleteOrder(@Param('orderId') orderId: string) {
  return this.ordersService.deleteOrder(orderId);
}
}
