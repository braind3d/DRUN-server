import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'drun-api-iam',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'drun-api-iam-queue',
          queueOptions: {
            durable: true
          },
        },
      },
      {
        name: 'drun-api-order',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'drun-api-order-queue',
          queueOptions: {
            durable: true
          },
        },
      },
      {
        name: 'drun-api-delivery',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'drun-api-delivery-queue',
          queueOptions: {
            durable: true
          },
        },
      }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
