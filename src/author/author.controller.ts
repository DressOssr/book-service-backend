import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { AuthorDto } from "./dto/author.dto";
import { RoleGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { FileInterceptor, NoFilesInterceptor } from "@nestjs/platform-express";

@Controller("author")
export class AuthorController {
  constructor(private authorService: AuthorService) {
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(NoFilesInterceptor())
  async createAuthor(@Body() authorDto: AuthorDto) {
    return await this.authorService.create(authorDto);
  }

  @Get()
  getAll() {
    return this.authorService.getAll();
  }
}
