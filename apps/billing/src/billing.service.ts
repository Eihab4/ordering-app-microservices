/* eslint-disable prettier/prettier */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HandledOrderCreatedDto } from './dtos/handled-order-creatd.dto';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    @Inject('BILLING_SERVICE') private readonly client: ClientProxy
  ) {}

  handleOrderCreated(data: HandledOrderCreatedDto) {
    this.logger.log(`Handling order: ${JSON.stringify(data)}`);
    return { success: true, message: 'Order processed' };
  }
}
