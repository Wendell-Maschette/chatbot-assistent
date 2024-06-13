import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

@Injectable()
export class OpenAIService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.apiUrl = this.configService.get<string>('OPENAI_API_URL');
  }

  public async generateResponse(prompt: string): Promise<any> {
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 150,
      temperature: 1,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const config: AxiosRequestConfig = {
      baseURL: this.configService.get<string>('OPENAI_API_URL'),
      method: 'POST',
      data,
      headers,
    };

    return await this.httpService.axiosRef
      .request(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error) => {
        throw new Error(`Failed to generate gpt: ${error.message}`);
      });
  }
}
