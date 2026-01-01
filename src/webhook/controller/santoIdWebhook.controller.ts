import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BasicAuthGuard } from 'src/auth/guards/basicAuthGuard.guard';
@Controller('webhook/santo-id')
export class SantoIdWebhookController {
    constructor() {}

    @Post()
    @UseGuards(BasicAuthGuard)
    async handleOcrWebhook(@Body() payload: any) {
        const labels = payload.documents?.[0]?.ocr?.labels;

  if (!labels) {
    console.log('Nenhum label encontrado');
    return { status: 'ignored' };
  }

  for (const label of labels) {
    const value =
      label.ocrInterpretive ??
      label.text ??
      null;

    console.log(`Campo ${label.label}:`, value);

    }}

    @Get('health')
    @UseGuards(BasicAuthGuard)
    async heathcheck() {
        return { status: 'ok' };
    }
}
