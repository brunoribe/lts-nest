import { Controller, Post, Body, Get } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  @Get()
  getEvents() {
    return this.eventService.getEvents();
  }

  @Post()
  createEvent(@Body() body: { type: string; cookie: string }) {
    return this.eventService.createEvent(body.type, body.cookie);
  }
}