import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LeadService {
  private kafkaClient: ClientKafka;

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

    return lead;
  }

  async getLeads() {
    return this.prisma.lead.findMany();
  }

  async updateLeadScore(leadId: number, score: number): Promise<void> {
    const LeadFactory = this.prisma.lead;

    await LeadFactory.update({
      where: {
        id: leadId,
      },
      data: {
        score,
      },
    });
  }
}