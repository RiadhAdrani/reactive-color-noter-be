import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [UserModule, PrismaModule, NoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
