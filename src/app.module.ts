import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import '@nestjs/config';
import { ChatbotPresentationModule } from './presentations/chatbot/chatbot.presentation.module';
import { ChatbotModule } from './libs/chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatbotModule,
    ChatbotPresentationModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
