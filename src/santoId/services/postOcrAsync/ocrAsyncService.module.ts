import { Module } from '@nestjs/common';
import axios from 'axios';
import { PostOcrAsyncService } from './service/postOcrAsync.service';
import { OcrAsyncController } from 'src/santoId/controller/ocrAsync.controller';
import { AuthServiceModule } from 'src/auth/services/authService.module';

@Module({
    imports: [AuthServiceModule],
    controllers: [OcrAsyncController],
    providers: [
        {
            provide: 'SANTO_ID',
            useFactory: () => {
                return axios.create({
                    baseURL: 'https://api.santoid.com.br/api/v1',
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            },
        },

        PostOcrAsyncService,
    ],
    exports: [PostOcrAsyncService],
})
export class PostOcrAsyncServiceModule {}
