import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PoemsService } from './poems.service';

@Controller('poems')
export class PoemsController {
  constructor(private readonly poemService: PoemsService) {}

  @Post('')
  async generatePoem(
    @Body('prompt') prompt: string,
    // TODO: take the user from the auth JWT token
    @Body('userId') userId: string,
  ) {
    return await this.poemService.generatePoem(parseInt(userId), prompt);
  }

  @Get(':userId')
  // TODO: take the user from the auth JWT token
  async getPoemsByUser(@Param('userId') userId: string) {
    return this.poemService.getPoemsByUser(parseInt(userId));
  }
}
