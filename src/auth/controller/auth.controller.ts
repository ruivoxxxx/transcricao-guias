import { Body, Controller, Post } from '@nestjs/common';
import { SantoIdService } from '../services/serviceAccountBase64/service/santoId.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly santoIdService: SantoIdService) {}

    @Post('santo-id')
    async auth(@Body('service_account') service_account_base64: any) {
        return this.santoIdService.execute(service_account_base64);
    }
}
