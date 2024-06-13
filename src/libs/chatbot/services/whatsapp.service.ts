import { Injectable } from '@nestjs/common';
import { EvolutionApiResolver } from 'src/resolvers/evolution-api/evolution-api.resolver';

@Injectable()
export class WhatsappService {
  constructor(private evolutionApiResolver: EvolutionApiResolver) {}

  public async fetchInstances(): Promise<any> {
    console.log('Buscando instancias')
    return await this.evolutionApiResolver.fetchInstances();
  }

  public async sendMessage(
    textMessage: string,
    number: string,
    id: any,
  ): Promise<void> {
    const params = {
      number,
      textMessage,
      id,
    };

    console.log('Enviando mensagem')
    return await this.evolutionApiResolver.sendMessage(params);
  }
}
