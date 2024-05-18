import { Controller, Inject } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { EventToScoreDTO, EventToScoreEndDTO } from '../types/DTOs';

type ScoreAccumulator = {
  [leadId: number]: string[];
};

@Controller('score')
export class ScoreController {
  private scoreService: ScoreService;
  private kafkaClient: ClientKafka;
  private scoreAccumulator: ScoreAccumulator;

  constructor(scoreService: ScoreService, @Inject('KAFKA_CLIENT') clientKafka: ClientKafka) {
    this.kafkaClient = clientKafka;
    this.scoreService = scoreService;
    this.scoreAccumulator = {};
  }

  @MessagePattern('event-to-score')
  async handleLeadEvent(@Payload() message: EventToScoreDTO) {
    console.log('[SCORE] Received lead event:', message);

    if (!this.scoreAccumulator[message.leadId]) {
      this.scoreAccumulator[message.leadId] = [];
    }

    this.scoreAccumulator[message.leadId].push(message.eventType);

    return 'success';
  }

  @MessagePattern('event-to-score-end')
  async handleLeadEventEnd(@Payload() message: EventToScoreEndDTO) {
    console.log('[SCORE] Received end of lead event stream:', message.leadId);

    const score = this.scoreService.calculateScore(this.scoreAccumulator[message.leadId]);

    console.log('[SCORE] Calculated score:', score);

    this.kafkaClient.emit('score-calculated', { leadId: message.leadId, score });

    delete this.scoreAccumulator[message.leadId];

    return 'success';
  }
}