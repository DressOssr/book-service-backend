import { Injectable, Post } from "@nestjs/common";
import { CategoryDto } from "./dto/category.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "./category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {
  }
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
