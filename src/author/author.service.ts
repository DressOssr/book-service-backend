import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Author } from "./author.model";
import { AuthorDto } from "./dto/author.dto";

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author
  ) {
  }

   async create(authorDto:AuthorDto){
    return await this.authorModel.create(authorDto)
  }
}
