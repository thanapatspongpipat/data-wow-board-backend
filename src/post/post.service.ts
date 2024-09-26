import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
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

  findAll(query: any) {
    const { category, authorId, search } = query;
    
    return this.prisma.post.findMany({
      where: {
        ...(category && { category }), // Filter by category if provided
        ...(authorId && { authorId: Number(authorId) }), // Filter by authorId if provided
        ...(search && {
          OR: [
            { topic: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        }), // Search in both topic and content
      },
      include: {
        author: true,
        comments: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }
  async update(id: number, updatePostDto: UpdatePostDto) {
    // Check if the post exists
    const existingPost = await this.prisma.post.findUnique({
      where: { id: id },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Update the post
    return this.prisma.post.update({
      where: { id: id },
      data: {
        topic: updatePostDto.topic,
        content: updatePostDto.content,
        category: updatePostDto.category,
      },
    });
  }

  async remove(id: number) {
    const existingPost = await this.prisma.post.findUnique({
      where: { id: id },
    });

    if (!existingPost) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.prisma.post.delete({
      where: { id: id },
    });
  }
}
