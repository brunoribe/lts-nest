import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { LeadService } from './lead.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { CreatedLeadDTO, ScoreCalculatedDTO } from '../types/DTOs';

@Controller('lead')
export class LeadController {
  private leadService: LeadService;
  private kafkaClient: ClientKafka;

  constructor(leadService: LeadService, @Inject('KAFKA_CLIENT') clientKafka: ClientKafka) {
    this.leadService = leadService;
    this.kafkaClient = clientKafka;
  }

  @Get()
  getLeads() {
    return this.leadService.getLeads();
  }

  @Post()
  async createLead(@Body() body: { name: string; email: string; cookie: string }) {
    const newLead = await this.leadService.createLead(body.name, body.email, body.cookie);
    const payload: CreatedLeadDTO = {
      leadId: newLead.id,
      cookie: newLead.cookie,
    };

    this.kafkaClient.emit('created-lead', payload);

    return newLead;
  }

  @MessagePattern('score-calculated')
  async handleScoreCalculated(message: ScoreCalculatedDTO): Promise<string> {
    console.log('[LEAD] Received calculated score:', message);

    await this.leadService.updateLeadScore(message.leadId, message.score);

    return 'success';
  }
}