/* eslint-disable prettier/prettier */
import { DynamicModule, Module } from "@nestjs/common";
import { ClientsModule, Transport, ClientProvider } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { RmqModuleOption } from "../interfaces/rmq-option.interface";

@Module({
  imports: []
})
export class RabbitMQModule {
  constructor() {}

  static register({ name }: RmqModuleOption): DynamicModule {
    return {
      module: RabbitMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService): ClientProvider => {
              const uri = configService.get<string>('RABBIT_MQ_URI') ?? '';
              const queue = configService.get<string>(`RABBIT_MQ_${name}_QUEUE`) ?? '';
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [uri],
                  queue,
                  queueOptions: { durable: true },
                  socketOptions: {
                    heartbeatIntervalInSeconds: 10,
                  }
                }
              };
            },
            inject: [ConfigService]
          }
        ])
      ],
      exports: [ClientsModule]
    };
  }
}
