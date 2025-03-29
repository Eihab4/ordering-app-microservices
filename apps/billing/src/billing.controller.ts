/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Controller, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { BillingService } from './billing.service';
import { HandledOrderCreatedDto } from './dtos/handled-order-creatd.dto';

@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    @Inject('BILLING_SERVICE') private readonly client: ClientProxy
  ) {}

  async connectToRabbitMQ() {
    try {
      await this.client.connect();
    } catch (err) {
      setTimeout(() => this.connectToRabbitMQ(), 5000);
    }
  }

  @MessagePattern('order_created')
  handleOrderCreated(@Payload() data: HandledOrderCreatedDto, @Ctx() context: RmqContext) {
    const result = this.billingService.handleOrderCreated(data);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return { success: true, message: 'Order billed successfully' };
  }
}