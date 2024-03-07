import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { BookService } from "./book.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { BookDto } from "./dto/book.dto";
import { RoleGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { ImageService } from "../image/image.service";

@Controller("book")
export class BookController {
  constructor(
    private readonly bookService: BookService,
  ) {

  }

  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Post()
  async createBook(@Body() dto: BookDto, @UploadedFile() image: any) {
     return await this.bookService.createBook(dto,image);
  }

  @Get(":id")
  async getBookById(@Param() params: any) {
    return await this.bookService.getBookById(params.id);
  }

  @Get()
  async getAllBook() {
    return await this.bookService.getAllBook();
  }
}
