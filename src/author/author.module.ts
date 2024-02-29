import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Author } from "./author.model";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { BookAuthor } from "./bookAuthor.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Author,BookAuthor]),
    AuthModule
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: []

})
export class AuthorModule {

}
