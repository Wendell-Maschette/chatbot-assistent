import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [WhatsappService],
  imports: [HttpModule],
  exports: [WhatsappService],
})
export class WhatsappModule {}
