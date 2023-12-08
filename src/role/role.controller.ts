import { Body, Controller, Get, HttpStatus, Post, UseGuards } from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {User} from "../users/user.model";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {RoleService} from "./role.service";
import {CreateRoelDto} from "./dto/create-role";
import {Role} from "./role.model";
import { AccessTokenGuard } from "../common/accessToken.guard";
import { RoleGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/role-auth.decorator";

@Controller('role')
export class RoleController {
    constructor(
        private roleService: RoleService,
    ) {
    }


    //TODO ADD GUARD ROLE ADN JWT
    @Post()
    @ApiOperation({summary: "Add new role"})
    @ApiParam({name: "role", required: true})
    @ApiParam({name: "description", required: true})
    @ApiResponse({status: HttpStatus.OK, description: "Success", type: Role})
    @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Bad Request"})
    create(@Body() roleDto: CreateRoelDto): Promise<Role > {
        return this.roleService.createRole(roleDto);
    }

    @Get()
    getAll() {
        return this.roleService.findAll();
    }
}
