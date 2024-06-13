import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

type params = {
  number: string;
  textMessage: string;
  id: string;
};

@Injectable()
export class EvolutionApiResolver {
  private readonly headers = {
    'Content-Type': 'application/json',
    apikey: this.configService.get<string>('EVOLUTION_API_KEY'),
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async fetchInstances() {
    const config: AxiosRequestConfig = {
      baseURL: this.configService.get<string>('EVOLUTION_API_URL'),
      url: '/instance/fetchInstances',
      method: 'GET',
      headers: this.headers,
    };

    return await this.httpService.axiosRef
      .request(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error) => {
        throw new Error(`Failed to fetch instances: ${error.message}`);
      });
  }

  public async sendMessage(params: params): Promise<void> {
    const config: AxiosRequestConfig = {
      baseURL: this.configService.get<string>('EVOLUTION_API_URL'),
      url: `/message/sendText/${params.id}`,
      method: 'POST',
      params,
      headers: this.headers,
    };

    console.log({ config });
    return await this.httpService.axiosRef
      .request(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error) => {
        throw new Error(`Integration failed to send message: ${error.message}`);
      });
  }
}
