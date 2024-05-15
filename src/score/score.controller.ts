import { Controller, Post, Body } from '@nestjs/common';
import { ScoreService } from './score.service';

@Controller('score')
export class ScoreController {
  private scoreService: ScoreService;

  constructor(scoreService: ScoreService) {
    this.scoreService = scoreService;
  }
}