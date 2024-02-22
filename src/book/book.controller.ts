import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BookService } from "./book.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { BookDto } from "./dto/book.dto";
import { RoleGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";

@Controller("book")
export class BookController {
  constructor(
    private bookService: BookService
  ) {

  }

  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async createBook(@Body() dto:BookDto,@UploadedFile() image) {
    console.log(dto);
    console.log(image);
    // const { authorsId, categoriesId, ...obj } = dto;
    // const book = await this.bookService.createBook(obj);
    // await this.bookService.addToBookAuthor(book.id,authorsId);
    // await this.bookService.addToBookCategory(book.id,categoriesId);
    // return book;
  }
  @Get(":id")
  async getById(@Param() params: any) {
   return await this.bookService.getBookById(params.id)
  }
  @Get()
  async getAll() {
    return await this.bookService.getAllBook()
  }
}
