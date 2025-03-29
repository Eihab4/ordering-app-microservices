/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqOptions, Transport } from "@nestjs/microservices";
@Injectable()
export class RabbitMQService { 
    constructor(private readonly configService: ConfigService) { }
    getRabbitMQOptions(queue:string,noAck=false):RmqOptions{
        return {
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.get<string>('RABBIT_MQ_URL') || 'amqp://localhost'],
                queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`) || 'defaultQueue',
                noAck,
                persistent: true,
            }
        }
    }
}