import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NoteDto } from './dto/Note.dto';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async create(dto: NoteDto) {
    const note = await this.prisma.note.create({
      data: { color: 0, authorId: dto.authorId, text: dto.text },
    });

    return note;
  }

  async getById(id: number) {
    const note = await this.prisma.note.findUnique({ where: { id } });

    return note;
  }

  async getByUser(id: number) {
    const notes = await this.prisma.note.findMany({ where: { authorId: id } });

    return notes;
  }

  async update(id: number, dto: NoteDto) {
    const note = await this.prisma.note.update({
      data: { color: dto.color, text: dto.text },
      where: { id },
    });

    return note;
  }

  async delete(id: number) {
    const note = await this.prisma.note.delete({
      where: { id },
    });

    return note;
  }
}
