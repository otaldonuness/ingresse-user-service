import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitMqOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_QUEUE',
        transport: Transport.RMQ,
        options: rabbitMqOptions,
      },
    ]),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
