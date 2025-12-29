import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'src/auth/guards/basicAuthGuard.guard';
@Controller('webhook/santo-id')
export class SantoIdWebhookController {
    constructor() {}

    @Post()
    @UseGuards(BasicAuthGuard)
    async handleOcrWebhook(@Body() payload: any) {
        console.log('Received webhook payload:', payload);

        // Process the payload as needed

        return { status: 'success' };
    }

    @Get('health')
    async heathcheck() {
        return { status: 'ok' };
    }
}
