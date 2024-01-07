import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PoemsService } from './poems.service';
import { verify } from 'jsonwebtoken';

@Controller('poems')
export class PoemsController {
  constructor(private readonly poemService: PoemsService) {}

  @Post('')
  async generatePoem(
    @Body('prompt') prompt: string,
    @Body('authToken') token: string,
  ) {
    const { userId } = verify(token, process.env.JWT_TOKEN) as any;
    return {
      poem: await this.poemService.generatePoem(parseInt(userId), prompt),
    };
  }

  @Get(':authToken')
  async getPoemsByUser(@Param('authToken') token: string) {
    const { userId } = verify(token, process.env.JWT_TOKEN) as any;
    const poems = await this.poemService.getPoemsByUser(parseInt(userId));
    return poems.map((poem) => {
      return {
        id: poem.id,
        authorName: poem.user.name,
        poem: poem.generatedPoem,
        publishedDate: poem.createdAt,
      };
    });
  }
}
