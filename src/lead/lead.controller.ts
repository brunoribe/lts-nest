import { Controller, Post, Body, Get } from '@nestjs/common';
import { LeadService } from './lead.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('lead')
export class LeadController {
  private leadService: LeadService;

  constructor(leadService: LeadService) {
    this.leadService = leadService;
  }

  @Get()
  getLeads() {
    return this.leadService.getLeads();
  }

  @Post()
  createLead(@Body() body: { name: string; email: string; cookie: string }) {
    return this.leadService.createLead(body.name, body.email, body.cookie);
  }
}