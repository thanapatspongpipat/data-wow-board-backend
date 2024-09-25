import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor (private prisma: PrismaService){}
  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
        data: {
            topic: createPostDto.topic,
            content: createPostDto.content,
            category: createPostDto.category,
            authorId: createPostDto.authorId,
        },
    });
}

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
        comments: true
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id: id
      },
      include: {
        author: true,
        comments: true
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
