import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthServiceModule } from './auth/services/authService.module';
// import { DatabaseModule } from './shared/database/database.module';
// import { SharedModule } from './shared/shared.module';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { PostOcrAsyncModule } from './santoId/ocrAsync.module';

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
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
