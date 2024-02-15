import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { RoleGuard } from "../auth/guard/role.guard";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { BookService } from "./book.service";
import { BookDto } from "./dto/book.dto";

@Controller("book")
export class BookController {
  constructor(
    private bookService: BookService
  ) {

  }

  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @Post()
  async createBook(@Body() dto: BookDto) {
    const { authorsId, categoriesId, ...obj } = dto;
    const book = await this.bookService.createBook(obj);
    await this.bookService.addToBookAuthor(book.id,authorsId);
    await this.bookService.addToBookCategory(book.id,categoriesId);
    return book;
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
