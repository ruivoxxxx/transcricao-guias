import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import type { AxiosInstance } from 'axios';

@Injectable()
export class GetOcrAsyncService {
    constructor(@Inject('SANTO_ID') private readonly santoId: AxiosInstance) {}

    async execute(requestId: string) {
        try {
            const { data } = await this.santoId.get(`ocr/async/${requestId}`);
            return data;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
