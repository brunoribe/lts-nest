import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LeadService {
  private kafkaClient: ClientKafka;

  constructor(@Inject('KAFKA_CLIENT') clientKafka: ClientKafka) {
    this.kafkaClient = clientKafka;
  }

  async onModuleInit() {
    await this.kafkaClient.connect();
    console.log('onModuleInit kafkaClient connect');
  }

  private prisma = new PrismaClient();

  async createLead(name: string, email: string, cookie: string) {
    const LeadFactory = this.prisma.lead;

    const lead = await LeadFactory.create({
      data: {
        name,
        email,
        cookie,
      },
    });

    console.log('Emitting created-lead event');
    this.kafkaClient.emit('created-lead', lead);

    return lead;
  }

  async getLeads() {
    return this.prisma.lead.findMany();
  }
}