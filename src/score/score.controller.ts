import { Controller } from '@nestjs/common';
import { ScoreService } from './score.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('score')
export class ScoreController {
  private scoreService: ScoreService;

  constructor(scoreService: ScoreService) {
    this.scoreService = scoreService;
  }

  @MessagePattern('created-lead')
  async handleLeadMessage(@Payload() message: any) {
    console.log('[CONTROLLER] Received lead message:', message);
    return 'Response to the lead message';
  }
}