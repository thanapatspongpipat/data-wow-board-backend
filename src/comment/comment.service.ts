import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma : PrismaService){}
  async create(CreateCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
        data: {
            content: CreateCommentDto.content,
            postId: CreateCommentDto.postId,
            authorId: CreateCommentDto.authorId,
        },
    });
}

  findAll() {
    return this.prisma.comment.findMany({
      include: {
        author: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: {
        id: id
      },
      include: {
        author: true,
      },
    });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    // Check if the post exists
    const existingComment = await this.prisma.comment.findUnique({
      where: { id: id },
    });

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.prisma.comment.update({
      where: { id: id },
      data: {
        content: updateCommentDto.content,
      },
    });
  }
  async remove(id: number) {
    const existingComment= await this.prisma.comment.findUnique({
      where: { id: id },
    });

    if (!existingComment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.prisma.comment.delete({
      where: { id: id },
    });
  }
}
