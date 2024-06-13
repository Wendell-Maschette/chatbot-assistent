import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotModule } from 'src/libs/chatbot/chatbot.module';

@Module({
  imports: [ChatbotModule],
  controllers: [ChatbotController],
})
export class ChatbotPresentationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({
      path: '/v1/chatbot*',
      method: RequestMethod.ALL,
    });
  }
}
