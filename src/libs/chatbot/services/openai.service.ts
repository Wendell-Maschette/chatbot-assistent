import { Injectable } from '@nestjs/common';
import { OpenAIResolver } from 'src/resolvers/openai-api/openai-api.resolver';

@Injectable()
export class OpenAIService {
  constructor(private openaiResolver: OpenAIResolver) {}

  public async generateResponse(prompt: string): Promise<any> {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 1,
    }; // criar type

    return await this.openaiResolver.generateResponse(data);
  }
}
