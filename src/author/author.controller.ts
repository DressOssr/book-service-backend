import { Body, Controller, Post } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthorDto } from "./dto/author.dto";

@Controller("author")
export class AuthorController {
  constructor(private authorService: AuthorService) {
  }

  @Post("create")
  async createAuthor(@Body() authorDto: AuthorDto) {
    return await this.authorService.create(authorDto);
  }

}
