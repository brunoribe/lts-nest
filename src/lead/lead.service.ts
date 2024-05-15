import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LeadService {
  private kafkaClient: ClientKafka;

  constructor(@Inject('KAFKA_CLIENT') clientKafka: ClientKafka) {
    this.kafkaClient = clientKafka;
  }

  async onModuleInit() {
    // Subscribe to response topics if needed
    this.kafkaClient.subscribeToResponseOf('created-lead');
    await this.kafkaClient.connect();
  }

  private prisma = new PrismaClient();

  async createLead(name: string, email: string, cookie: string) {
    const LeadFactory = this.prisma.lead;

    const lead = LeadFactory.create({
      data: {
        name,
        email,
        cookie,
      },
    });

    this.kafkaClient.emit('created-lead', lead);

    return lead;
  }

  async getLeads() {
    return this.prisma.lead.findMany();
  }
}