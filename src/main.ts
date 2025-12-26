import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const config = new DocumentBuilder()
        .setTitle('Transcrição-Guias API')
        .setDescription('Transcrição-Guias API description')
        .addTag('Modules')
        .addBearerAuth({
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 8081);
}
bootstrap();
