import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { RoleGuard } from "../auth/guard/role.guard";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";

@Controller('book')
export class BookController {

  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @Post()
  addBook() {
    return "Book Added";
  }
}
