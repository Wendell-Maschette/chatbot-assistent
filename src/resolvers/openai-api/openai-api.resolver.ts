import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class OpenAIResolver {
  private readonly headers: any;
  private readonly apiKey: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };
  }

  public async generateResponse(data: any): Promise<any> {
    const config: AxiosRequestConfig = {
      baseURL: this.configService.get<string>('OPENAI_API_URL'),
      method: 'POST',
      data,
      headers: this.headers,
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
