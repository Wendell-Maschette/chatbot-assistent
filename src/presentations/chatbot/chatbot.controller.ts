import { Post, Body, Get, Controller } from '@nestjs/common';
import { ChatbotService } from 'src/libs/chatbot/services/chatbot.service';
import { WebhookService } from 'src/libs/chatbot/services/webhook.service';

@Controller({ version: '1', path: 'chatbot' })
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  // @Get()
  // findInstances(): Promise<any> {
  //   return this.chatbotService.getInstances();
  // }

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    return this.chatbotService.processMessage(body);
  }
}
