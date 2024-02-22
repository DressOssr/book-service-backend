import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
import { RoleGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";

@Controller('category')
export class CategoryController {

  constructor(
   private categoryService:CategoryService
  ) {
  }
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @Post()
  async createCategory(@Body() dto:CategoryDto){
    return await this.categoryService.create(dto)
  }
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @Post("/many")
  async createCategories(@Body() dto:CategoryDto[]){
    return await this.categoryService.createMany(dto)
  }

  @Get()
  async GetAll(){
    return await this.categoryService.getAll()
  }
}
