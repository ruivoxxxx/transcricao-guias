import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthServiceModule } from './auth/services/authService.module';
// import { DatabaseModule } from './shared/database/database.module';
// import { SharedModule } from './shared/shared.module';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PostOcrAsyncModule } from './santoId/ocrAsync.module';
import { SantoIdWebhookModule } from './webhook/santoIdWebhook.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        AuthServiceModule,
        // DatabaseModule,
        // SharedModule,
        PostOcrAsyncModule,
        SantoIdWebhookModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
