import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  public async handleWebhook(data: any): Promise<any> {
    // Verifique os dados recebidos do webhook
    console.log('Dados recebidos do Webhook:', JSON.stringify(data, null, 2));

    // Extraia a mensagem e o remetente dos dados do webhook
    const messageContent = data?.data?.message?.extendedTextMessage?.text || '';
    const instanceId = data?.data?.key?.id || '';
    const sender = data?.sender || '';

    // Formate os dados de acordo com o esperado pelo ChatbotService
    const formattedMessage = {
      Body: messageContent,
      From: sender,
    };

    // Envie a mensagem formatada para o chatbot
    return formattedMessage;
  }
}
