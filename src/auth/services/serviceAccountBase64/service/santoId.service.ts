import { Injectable } from '@nestjs/common';
import { SantoIdAuth } from '../../authSantoId/service/santoIdAuth.service';

@Injectable()
export class SantoIdService {
    constructor(private readonly santoIdAuth: SantoIdAuth) {}

    async execute(service_account: any) {
        const jsonString = JSON.stringify(service_account);

        const base64 = Buffer.from(jsonString, 'utf8').toString('base64');

        return this.santoIdAuth.execute(base64);
    }
}
