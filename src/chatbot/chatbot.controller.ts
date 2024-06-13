import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Controller('assistent')
export class ChatbotController {
  constructor(
    private readonly chatbotService: ChatbotService,
  ) {}

  @Post()
  handleWebhook(@Body() body: any): Promise<any> {
    // return this.chatbotService.processMessage(body);
    console.log(body);
    return;
  }

  // @Get()
  // findInstances(): Promise<any> {
  //   return this.chatbotService.getInstances();
  // }
}
