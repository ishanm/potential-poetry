import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PoemsService {
  constructor(private readonly prisma: PrismaService) {}

  async generatePoem(userId: number, poemPrompt: string) {
    const generatedPoem = await this.getChatGPTResponse(poemPrompt);
    await this.prisma.poem.create({
      data: {
        userInput: poemPrompt,
        generatedPoem: generatedPoem,
        userId: userId,
      },
    });
    return generatedPoem;
  }

  async getPoemsByUser(userId: number) {
    return this.prisma.poem.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });
  }

  // TODO: Extract into it's own service which handles all openAI stuff, not just poem responses
  private async getChatGPTResponse(poemPrompt: string) {
    const prompt = `Given this user prompt, please create a poem out of it: ${poemPrompt}`;
    const requestUrl = 'https://api.openai.com/v1/chat/completions';
    try {
      const response = await axios.post(
        requestUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `${prompt}` }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const chatResponse = response.data.choices[0].message.content;
      console.log(`For prompt: ${prompt}, chatResponse: ${chatResponse}`);
      return chatResponse;
    } catch (error) {
      if (error.response) {
        console.error(error.response.status, error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
      }
      // Let the client decide on whether to swallow the error or not
      throw error;
    }
  }
}
