import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoelDto } from "./dto/create-role";
import { Role } from "./role.model";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { RoleGuard } from "../auth/guard/role.guard";


@Controller("role")
export class RoleController {
  constructor(
    private roleService: RoleService
  ) {
  }

  // @ApiOperation({summary: "Add new role"})
  // @ApiParam({name: "role", required: true})
  // @ApiParam({name: "description", required: true})
  // @ApiResponse({status: HttpStatus.OK, description: "Success", type: Role})
  // @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Bad Request"})
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @Post()
  createRole(@Body() roleDto: CreateRoelDto): Promise<Role> {
    return this.roleService.createRole(roleDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get("/:id")
  async isAdmin(@Param("id") id: number) {
    return await this.roleService.findById(id);

  }

  @Get()
  getAll() {
    return this.roleService.findAll();
  }
}
