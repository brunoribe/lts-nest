import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
import { EventService } from './event.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { CreatedLeadDTO, EventToScoreDTO, EventToScoreEndDTO } from '../types/DTOs';
@Controller('event')
export class EventController {
  private eventService: EventService;
  private kafkaClient: ClientKafka;

  constructor(eventService: EventService, @Inject('KAFKA_CLIENT') clientKafka: ClientKafka) {
    this.eventService = eventService;
    this.kafkaClient = clientKafka;
  }

  @Get()
  getEvents() {
    return this.eventService.getEvents();
  }

  @Post()
  createEvent(@Body() body: { type: string; cookie: string }) {
    return this.eventService.createEvent(body.type, body.cookie);
  }

  @MessagePattern('created-lead')
  async handleLeadCreated(@Payload() message: CreatedLeadDTO) {
    console.log('[EVENT] Received created lead message:', message);
    const leadEvents = await this.eventService.getEventsByCookie(message.cookie);

    if (!leadEvents) {
      return 'success';
    }

    for (const event of leadEvents) {
      const payload: EventToScoreDTO = {
        leadId: message.leadId,
        eventType: event.type,
      };

      console.log('[EVENT] Emitting lead event to score:', payload);

      this.kafkaClient.emit('event-to-score', payload);
    }

    const payload: EventToScoreEndDTO = {
      leadId: message.leadId,
    };

    this.kafkaClient.emit('event-to-score-end', payload);

    return 'success';
  }
}