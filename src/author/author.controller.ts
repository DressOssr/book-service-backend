import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthorDto } from "./dto/author.dto";

@Controller("author")
export class AuthorController {
  constructor(private authorService: AuthorService) {
  }

  @Post()
  async createAuthor(@Body() authorDto: AuthorDto) {
    return await this.authorService.create(authorDto);
  }
  @Get()
  async GetAll() {
    return await this.authorService.getAll();
  }
}
