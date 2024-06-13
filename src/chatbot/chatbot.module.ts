import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OpenaiModule } from 'src/openai/openai.module';
import { WhatsappModule } from 'src/whatsapp/whatsapp.module';
import { WebhookService } from 'src/webhook/webhook.service';

@Module({
  imports: [ConfigModule, HttpModule, OpenaiModule, WhatsappModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [ChatbotService],
})
export class ChatbotModule {}
