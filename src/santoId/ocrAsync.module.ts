import { Module } from '@nestjs/common';
import { PostOcrAsyncServiceModule } from './services/postOcrAsync/ocrAsyncService.module';

@Module({
    imports: [PostOcrAsyncServiceModule],
    exports: [PostOcrAsyncServiceModule],
})
export class PostOcrAsyncModule {}
