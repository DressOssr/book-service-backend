import { Controller, Get, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { RoleGuard } from "../auth/guard/role.guard";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { CurrentUser } from "./decorator/user.decorator";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private userService: UsersService
  ) {
  }

  @Roles("ADMIN")
  @UseGuards(RoleGuard)
  @UseGuards(AccessTokenGuard)
  @Get("/all")
  getAll() {
    return this.userService.findAll();
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async getById(@CurrentUser("sub") id: number) {
    console.log(id);
    return await this.userService.findById(id);
  }



}
