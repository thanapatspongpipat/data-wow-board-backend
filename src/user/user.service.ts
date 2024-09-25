import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (user) throw new ConflictException('email duplicated');
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
    const { ...result } = newUser;
    return result;
  }

  findAllUser() {
    return `This action returns all user`;
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

}
