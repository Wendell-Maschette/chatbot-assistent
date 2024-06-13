import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly whatsappService: WhatsappService,
  ) {}

  public async processMessage(body: any): Promise<any> {
    const incomingMessage = body.Body;
    const from = body.From;
    const dataInstance = await this.whatsappService.fetchInstances();

    try {
      // const gptResponse = await this.openaiService.generateResponse(incomingMessage);
      // console.log('Resposta do OpenAI:', gptResponse.choices[0].message.content.trim());

      let responseMessage: string;
      // if (gptResponse.choices && gptResponse.choices.length > 0) {
      //   responseMessage = gptResponse.choices[0].message.content.trim();
      // } else {
      //   responseMessage = 'Desculpe, não consegui processar sua mensagem.';
      // }

      
      await this.whatsappService.sendMessage(responseMessage, from, dataInstance.instanceId);

      return { status: 'success' };
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);
      const errorMessage = 'Ocorreu um erro ao processar sua mensagem.';

      // Enviar mensagem de erro de volta ao remetente
      await this.whatsappService.sendMessage(errorMessage, from, dataInstance.instanceId);

      return { status: 'error', message: errorMessage };
    }
  }
}
