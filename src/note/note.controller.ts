import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NoteDto } from './dto/Note.dto';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private service: NoteService) {}

  @Post()
  create(@Body() note: NoteDto) {
    return this.service.create(note);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    const maybeId = parseInt(id);

    if (!Number.isNaN(maybeId)) {
      return this.service.getById(maybeId);
    } else {
      throw new BadRequestException('Invalid note id.');
    }
  }

  @Get('user/:id')
  getByUser(@Param('id') id: string) {
    const maybeId = parseInt(id);

    if (!Number.isNaN(maybeId)) {
      return this.service.getByUser(maybeId);
    } else {
      throw new BadRequestException('Invalid user id.');
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() note: NoteDto) {
    const maybeId = parseInt(id);

    if (!Number.isNaN(maybeId)) {
      return this.service.update(maybeId, note);
    } else {
      throw new BadRequestException('Invalid note id.');
    }
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const maybeId = parseInt(id);

    if (!Number.isNaN(maybeId)) {
      return this.service.delete(maybeId);
    } else {
      throw new BadRequestException('Invalid note id.');
    }
  }
}
