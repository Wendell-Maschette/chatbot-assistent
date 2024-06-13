import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  private readonly apiUrl =
    this.configService.get<string>('EVOLUTION_API_URL') + '/instances';

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  public async fetchInstances(): Promise<any> {
    const headers = {
      'Content-Type': 'application/json',
      apikey: this.configService.get<string>('EVOLUTION_API_KEY'),
    };
    const config: AxiosRequestConfig = {
      baseURL: this.configService.get<string>('EVOLUTION_API_URL'),
      url: '/instance/fetchInstances',
      method: 'GET',
      headers: headers,
    };

    console.log(config);

    return await this.httpService.axiosRef
      .request(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error) => {
        throw new Error(`Failed to fetch instances: ${error.message}`);
      });
  }

  public async sendMessage(
    textMessage: string,
    number: string,
    id: any,
  ): Promise<void> {
    const params = {
      number,
      textMessage,
    };

    const headers = {
      'Content-Type': 'application/json',
      apikey: this.configService.get<string>('EVOLUTION_API_KEY'),
    };
    const config: AxiosRequestConfig = {
      baseURL: this.configService.get<string>('EVOLUTION_API_URL'),
      url: `/message/sendText/${id}`,
      method: 'POST',
      params,
      headers,
    };

    console.log(`config ${config}`)

    return await this.httpService.axiosRef
      .request(config)
      .then((res: AxiosResponse) => {
        return res.data;
      })
      .catch((error) => {
        throw new Error(`Failed to send message: ${error.message}`);
      });
  }
}
