import { Injectable } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import { WhatsappService } from './whatsapp.service';
import { WebhookService } from './webhook.service';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly openaiService: OpenAIService,
    private readonly whatsappService: WhatsappService,
    private readonly webhookService: WebhookService,
  ) {}

  public async generateAssistent(body: any) {
    console.log(body);
    return;
  }

  public async processMessage(body: any): Promise<any> {
    console.log('cheguei em processMessage');
    const incomingMessage = this.webhookService.handleWebhook(body);
    console.log('mensagem formatada', incomingMessage);

    const from = body.From;
    const dataInstance = await this.whatsappService.fetchInstances();
    // const gptResponse = await this.openaiService.generateResponse(incomingMessage);
    // console.log('Resposta do OpenAI:', gptResponse.choices[0].message.content.trim());

    let responseMessage: string;
    // if (gptResponse.choices && gptResponse.choices.length > 0) {
    //   responseMessage = gptResponse.choices[0].message.content.trim();
    // } else {
    //   responseMessage = 'Desculpe, não consegui processar sua mensagem.';
    // }

    await this.whatsappService.sendMessage(
      responseMessage,
      from,
      dataInstance.instanceId,
    );

    return await this.whatsappService
      .sendMessage(responseMessage, from, dataInstance.instanceId)
      .then((res) => {
        status: 'success';
        message: 'Mensagem enviada: ' + res;
      })
      .catch(async (err) => {
        console.error('Erro ao processar a mensagem:', err);
        const errorMessage = 'Ocorreu um erro ao processar sua mensagem.';

        // Enviar mensagem de erro de volta ao remetente
        await this.whatsappService.sendMessage(
          errorMessage,
          from,
          dataInstance.instanceId,
        );

        return { status: 'error', message: errorMessage };
      });
  }
}
