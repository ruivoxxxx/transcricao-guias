import { Controller, Get } from '@nestjs/common';
import { DatabaseSolusService } from './shared/database/services/databaseSolus.service';

@Controller()
export class AppController {
    constructor(private readonly db: DatabaseSolusService) {}

    @Get()
    async healthCheck() {
        const solus = await this.db.findOne<{ sysdate: Date }>(
            'select sysdate from dual',
        );

        return { Solus: solus?.sysdate };
    }
}
