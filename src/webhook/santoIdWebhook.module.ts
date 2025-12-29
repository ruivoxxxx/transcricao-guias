import { Module } from '@nestjs/common';
import { SantoIdWebhookController } from './controller/santoIdWebhook.controller';
import { BasicAuthGuard } from 'src/auth/guards/basicAuthGuard.guard';

@Module({
    controllers: [SantoIdWebhookController],
    providers: [BasicAuthGuard],
})
export class SantoIdWebhookModule {}
