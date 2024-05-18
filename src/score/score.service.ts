import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';

enum EventType {
  PAGE_ACCESS = 'PAGE_ACCESS',
  BUTTON_CLICK = 'BUTTON_CLICK',
  FORM_SUBMIT = 'FORM_SUBMIT',
}

const eventScores = {
  [EventType.PAGE_ACCESS]: 1,
  [EventType.BUTTON_CLICK]: 2,
  [EventType.FORM_SUBMIT]: 3,
};

@Injectable()
export class ScoreService {
  private prisma = new PrismaClient();

  constructor() {
  }

  calculateScore(events: string[]): number {
    let score = 0;

    events.forEach((event) => {
      score += eventScores[event as EventType];
    });

    return score;
  }
}