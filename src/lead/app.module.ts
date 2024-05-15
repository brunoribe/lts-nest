// lead.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeadController } from './lead.controller';
import { LeadService } from '../lead2/lead.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER], // Your Kafka broker(s)
          },
          consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP // Consumer group ID
          }
        },
      },
    ]),
  ],
  controllers: [LeadController],
  providers: [LeadService],
})
export class AppModule { }
