import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PoemGeneratorService {
  constructor() {}

  public async getChatGPTResponse(poemPrompt: string) {
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
