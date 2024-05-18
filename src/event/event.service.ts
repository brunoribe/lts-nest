import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EventService {
  private prisma = new PrismaClient();

  async createEvent(type: string, cookie: string) {
    const EventFactory = this.prisma.event;

    const event = EventFactory.create({
      data: {
        type,
        cookie,
      },
    });

    return event;
  }

  async getEvents() {
    return this.prisma.event.findMany();
  }

  async getEventsByCookie(cookie: string) {
    return this.prisma.event.findMany({
      where: {
        cookie,
      },
    });
  }
}