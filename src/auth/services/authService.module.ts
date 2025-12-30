import { Module } from '@nestjs/common';
import { AuthController } from '../controller/auth.controller';
import { SantoIdService } from './serviceAccountBase64/service/santoId.service';
import { SantoIdAuth } from './authSantoId/service/santoIdAuth.service';
import axios from 'axios';

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [
        {
            provide: 'SANTO_ID',
            useFactory: () => {
                return axios.create({
                    baseURL: 'https://api.santoid.com.br/api/v1',
                    timeout: 10000,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.SANTO_ID_TOKEN}`,
                    },
                });
            },
        },

        SantoIdService,
        SantoIdAuth,
    ],
    exports: [SantoIdService, SantoIdAuth, 'SANTO_ID'],
})
export class AuthServiceModule {}
