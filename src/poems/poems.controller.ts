import { Body, Controller, Post } from '@nestjs/common';
import { PoemsService } from './poems.service';

@Controller('poems')
export class PoemsController {
  constructor(private readonly poemService: PoemsService) {}

  @Post('')
  async generatePoem(@Body('prompt') prompt: string) {
    return await this.poemService.generatePoem(1, prompt);
  }
}
