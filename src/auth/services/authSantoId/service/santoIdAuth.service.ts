import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import type { AxiosInstance } from 'axios';

@Injectable()
export class SantoIdAuth {
    constructor(@Inject('SANTO_ID') private readonly santoId: AxiosInstance) {}

    async execute(serviceAccountBase64: string) {
        try {
            const { data } = await this.santoId.post(
                'service-account/refresh-token',
                {
                    service_account_base64: serviceAccountBase64,
                },
            );

            return data;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
