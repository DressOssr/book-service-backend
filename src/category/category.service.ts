import { Injectable, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { CategoryDto } from "./dto/category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./category.model";
import { RoleGuard } from "../auth/guard/role.guard";
import { Roles } from "../auth/decorator/role-auth.decorator";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {
  }
  @Post()
  @UseGuards(RoleGuard)
  @Roles("ADMIN")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("image"))
  async create(dto:CategoryDto){
    return await this.categoryModel.create(dto)
  }

  async createMany(dto: CategoryDto[]) {
    return await this.categoryModel.bulkCreate(dto)
  }

  async getAll() {
    return await this.categoryModel.findAll();
  }
}
