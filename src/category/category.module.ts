import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { Category } from "./category.model";
import { BookCategory } from "./bookCategory.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Category,BookCategory]),
    AuthModule
  ],
  providers: [CategoryService],
  controllers:[CategoryController]
})
export class CategoryModule {

}
