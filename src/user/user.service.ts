import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto) {
    try {
      const user = await this.prisma.user.create({
        data: { email: dto.email },
      });

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken.');
        }
      }

      throw error;
    }
  }

  async getById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user;
  }

  async updateName(id: number, newName: string) {
    const user = await this.prisma.user.update({
      data: { name: newName },
      where: { id },
    });

    return user;
  }
}
