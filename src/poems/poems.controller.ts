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
    return {
      poem: await this.poemService.generatePoem(parseInt(userId), prompt),
    };
  }

  @Get(':userId')
  // TODO: take the user from the auth JWT token
  async getPoemsByUser(@Param('userId') userId: string) {
    const poems = await this.poemService.getPoemsByUser(parseInt(userId));
    return poems.map((poem) => {
      return {
        authorName: poem.user.name,
        poem: poem.generatedPoem,
        publishedDate: poem.createdAt,
      };
    });
  }
}
