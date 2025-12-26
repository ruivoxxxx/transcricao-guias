import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { PostOcrAsyncService } from '../services/postOcrAsync/service/postOcrAsync.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostOcrAsyncInputDto } from '../services/postOcrAsync/dto/postOcrAsyncInputDto';

@Controller('ocr')
export class OcrAsyncController {
    constructor(private readonly postOcrAsyncService: PostOcrAsyncService) {}

    @Post('async')
    @UseInterceptors(FileInterceptor('imageFile'))
    async execute(
        @UploadedFile() imageFile: Express.Multer.File,
        @Body() body: PostOcrAsyncInputDto,
    ) {
        return this.postOcrAsyncService.execute({
            imageFile,
            track: body.track,
            template: body.template,
            customerRequestId: body.customerRequestId,
        });
    }
}
