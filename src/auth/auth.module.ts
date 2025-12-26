import { Module } from '@nestjs/common';
import { AuthServiceModule } from './services/authService.module';

@Module({
    imports: [AuthServiceModule],
    exports: [AuthServiceModule],
})
export class AuthModule {}
