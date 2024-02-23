import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from "./book.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./book.model";
import { AuthModule } from "../auth/auth.module";
import { BookAuthor } from "../author/bookAuthor.model";
import { BookCategory } from "../category/bookCategory.model";
import { Image } from "../image/image.model";
import { ImageModule } from "../image/image.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Book,BookAuthor,BookCategory,Image]),
    AuthModule,
    ImageModule
  ],
  providers: [BookService],
  controllers:[BookController]
})
export class BookModule {}
