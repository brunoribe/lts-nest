// lead.module.ts
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP,
          },
        },
      },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class AppModule { }
