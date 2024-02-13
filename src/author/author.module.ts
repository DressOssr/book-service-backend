import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Author } from "./author.model";
import { AuthorController } from "./author.controller";
import { AuthorService } from "./author.service";
import { BookAuthor } from "./bookAuthor.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Author,BookAuthor]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: []

})
export class AuthorModule {

}
