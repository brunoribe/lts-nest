import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
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
  }

  @MessagePattern('created-lead')
  async handleLeadMessage(@Payload() message: any) {
    console.log("Cheagou a mesngeiam do eladi", message);
  }

}