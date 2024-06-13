import { Module } from '@nestjs/common';
import { ChatbotService } from './services/chatbot.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OpenAIService } from './services/openai.service';
import { EvolutionApiResolver } from 'src/resolvers/evolution-api/evolution-api.resolver';
import { OpenAIResolver } from 'src/resolvers/openai-api/openai-api.resolver';
import { WhatsappService } from './services/whatsapp.service';
import { WebhookService } from './services/webhook.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    ChatbotService,
    OpenAIService,
    EvolutionApiResolver,
    OpenAIResolver,
    WhatsappService,
    WebhookService
  ],
  exports: [
    ChatbotService,
    OpenAIService,
    WhatsappService,
    WebhookService
  ],
})
export class ChatbotModule {}
