import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

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
  controllers: [LeadController],
  providers: [LeadService],
})

export class AppModule { }
