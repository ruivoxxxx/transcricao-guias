import { Module } from '@nestjs/common';
import { SantoIdWebhookController } from './controller/santoIdWebhook.controller';

@Module({
    controllers: [SantoIdWebhookController],
})
export class SantoIdWebhookModule {}
