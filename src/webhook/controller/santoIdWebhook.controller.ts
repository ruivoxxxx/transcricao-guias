import { Body, Controller, Post } from '@nestjs/common';
@Controller('webhook/santo-id')
export class SantoIdWebhookController {
    constructor() {}

    @Post()
    async handleOcrWebhook(@Body() payload: any) {
        console.log('Received webhook payload:', payload);

        // Process the payload as needed

        return { status: 'success' };
    }
}
