import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostOcrAsyncInputDto {
    @ApiProperty()
    imageFile: Express.Multer.File;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    track: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    template: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    customerRequestId: string;
}
