import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { ChatbotModule } from 'src/chatbot/chatbot.module';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [ChatbotModule],
  providers: [WebhookService],
  controllers: [WebhookController],
})
export class WebhookModule {}
