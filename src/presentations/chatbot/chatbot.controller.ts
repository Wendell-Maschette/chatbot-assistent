import { Post, Body, Controller } from '@nestjs/common';
import { ChatbotService } from 'src/libs/chatbot/services/chatbot.service';

@Controller({ version: '1', path: 'chatbot' })
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    return this.chatbotService.processMessage(body);
  }
}
