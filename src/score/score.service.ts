import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ScoreService {
  private prisma = new PrismaClient();

  private kafkaClient: ClientKafka;

  constructor(@Inject('KAFKA_CLIENT') clientKafka: ClientKafka) {
    this.kafkaClient = clientKafka;
  }

  async onModuleInit() {
    await this.kafkaClient.connect();
    console.log('onModuleInit kafkaClient connect');
  }
}