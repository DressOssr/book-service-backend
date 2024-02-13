import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from "@nestjs/common";
async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Book Services')
        .setDescription('API description to my pet-project')
        .setVersion('1.0')
        .addTag('book-service')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    app.use(cookieParser());
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    SwaggerModule.setup('api/docs', app, document);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));
}

bootstrap();
