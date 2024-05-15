// lead.module.ts
import { Module } from '@nestjs/common';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
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
            brokers: [process.env.KAFKA_BROKER], // Your Kafka broker(s)
          },
          consumer: {
            groupId: process.env.KAFKA_CONSUMER_GROUP // Consumer group ID
          }
        },
      },
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class AppModule { }
