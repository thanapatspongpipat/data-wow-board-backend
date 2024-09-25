import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '@prisma/client'; 

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    topic: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsEnum(Category) 
    category: Category;

    @IsNotEmpty()
    authorId: number;
}
