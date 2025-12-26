import { Module } from '@nestjs/common';
import { DatabaseSolusService } from './services/databaseSolus.service';

@Module({
    providers: [DatabaseSolusService],
    exports: [DatabaseSolusService],
})
export class DatabaseModule {}
