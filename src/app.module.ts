import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookService } from './book/book.service';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { PostsService } from './posts/posts.service';

@Module({
imports: [BookModule],
  controllers: [AppController],
  providers: [AppService, BookService, PrismaService, UserService, PostsService],
})
export class AppModule {}
