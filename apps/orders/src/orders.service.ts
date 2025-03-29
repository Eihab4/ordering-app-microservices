import { UpdateOrderDto } from './dtos/update-order.dto';
/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy) { }
  
async createOrder(createOrderDto: CreateOrderDto) {
  const newOrder = new this.orderModel(createOrderDto);
  try {
    this.billingClient.emit('order_created', {
      name: newOrder.name,
      phone: newOrder.phone,
      price: newOrder.price,
    });
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('OrdersService - Error:', error);
    throw new Error('Failed to create order');
  }
}
  async getOrders() { 
    return this.orderModel.find().exec();
  }
  async getOrderById(orderId: string) {
    const order = await this.orderModel.findById(orderId).exec();
    return order;
  }
  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) { 
    const updatedOrder = await this.orderModel.findByIdAndUpdate(orderId, updateOrderDto, { new: true });
    return updatedOrder;
  }
  async deleteOrder(orderId: string) {
    await this.orderModel.findByIdAndDelete(orderId);
    return {message: 'Order deleted successfully'};
  }
}
