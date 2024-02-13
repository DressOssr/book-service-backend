import { Body, Controller, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";

@Controller('category')
export class CategoryController {

  constructor(
   private categoryService:CategoryService
  ) {
  }

  @Post("create")
  async createCategory(@Body() dto:CategoryDto){
    return await this.categoryService.create(dto)
  }
}
