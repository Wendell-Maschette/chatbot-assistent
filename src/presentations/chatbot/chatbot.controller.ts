import { Post, Body, Controller, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { jresponse } from 'src/common/utils/jresponse-util/jresponse.util';
import { ChatbotService } from 'src/libs/chatbot/services/chatbot.service';

@ApiTags('chatbot')
@Controller({ version: '1', path: 'chatbot' })
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('webhook')
  @ApiOperation({ summary: 'API para receber mensagens do whatsapp via webhook' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Mensagem capturada', })
  async handleWebhook(@Body() body: any) {
    return this.chatbotService.processMessage(body).then((res) => {
      return jresponse.success({ message: 'Evento de mensagem processado com sucesso!' });
    })
    .catch((error) => {
      return jresponse.error(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Desculpe! Ocorreu um erro inesperado ao processar sua mensagem.',
      );
    });;
  }

  @Post('assistent-instructions')
  @ApiOperation({ summary: 'API para receber formulário do client web' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Formulário recebido', })
  async generateAssistent(@Body() body: any) {
    return this.chatbotService
      .generateAssistent(body)
      .then((res) => {
        return jresponse.success({ message: 'ok' });
      })
      .catch((error) => {
        return jresponse.error(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Desculpe! Ocorreu um erro inesperado ao processar sua solicitação.',
        );
      });
  }
}
