import {
    BadRequestException,
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import type { AxiosInstance } from 'axios';
import { PostOcrAsyncInputDto } from '../dto/postOcrAsyncInputDto';
import FormData from 'form-data';

@Injectable()
export class PostOcrAsyncService {
    constructor(@Inject('SANTO_ID') private readonly santoId: AxiosInstance) {}

    async execute({
        imageFile,
        track,
        template,
        customerRequestId,
    }: PostOcrAsyncInputDto) {
        try {
            console.log(template);
            if (!imageFile) {
                throw new BadRequestException('Arquivo não informado!');
            }

            const formData = new FormData();
            formData.append('imageFile', imageFile.buffer, {
                filename: imageFile.originalname,
            });
            formData.append('track', track);
            formData.append('template', template);
            formData.append('customerRequestId', customerRequestId);

            const { data } = await this.santoId.post(
                'ocr-async/ocr',
                formData,
                {
                    headers: {
                        ...formData.getHeaders(),
                        Authorization: `Bearer ${process.env.SANTO_ID_TOKEN}`,
                    },
                },
            );

            return data;
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            console.log(error.response?.data);
            throw new InternalServerErrorException(error.message);
        }
    }
}
