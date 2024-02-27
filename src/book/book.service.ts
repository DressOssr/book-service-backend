import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./book.model";
import { BookAuthor } from "../author/bookAuthor.model";
import { BookCategory } from "../category/bookCategory.model";
import { Author } from "../author/author.model";
import { Category } from "../category/category.model";
import { ImageService } from "../image/image.service";
import { BookDto } from "./dto/book.dto";
import { Image } from "../image/image.model";

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    @InjectModel(BookAuthor)
    private bookAuthorModel: typeof BookAuthor,
    @InjectModel(BookCategory)
    private bookCategoryModel: typeof BookCategory,
     private readonly imageService: ImageService


  ) {
  }
  private option = {
    include: [
      {
        model: Author,
        attributes: ["id","firstName","lastName"],
        through: {
          attributes: []
        }
      },
      {
        model: Category,
        attributes: ["id","value"],
        through: {
          attributes: []
        }
      },
      {
        model: Image,
        attributes: ["id","fileName","buffer"],
      }
    ]
  }
  async createBook(dto: BookDto,image) {
    const imageInBd =  await this.imageService.create({fileName:image.originalname,buffer:image.buffer});
    const {authorsId,categoriesId,...obj} = dto;
    const book =  await this.bookModel.create({...obj,imageId:imageInBd.id});
    await this.addToBookAuthor(book.id,authorsId)
    await this.addToBookCategory(book.id,categoriesId);
    return book;
  }

  async addToBookAuthor(id: number, authorsId: string[]) {
    if(!Array.isArray(authorsId)) authorsId = [authorsId];
    const obj = authorsId.map(number => (
      { bookId: id, authorId: Number(number) }
    ));
    return await this.bookAuthorModel.bulkCreate(obj);
  }

  async addToBookCategory(id: number, categoryId: string[]) {
    if(!Array.isArray(categoryId)) categoryId = [categoryId];
    const obj = categoryId.map(number => (
      { bookId: id, categoryId: Number(number) }
    ));
    return await this.bookCategoryModel.bulkCreate(obj);
  }

  async getBookById(id: number) {
    const test = await this.bookModel.findByPk(id, this.option);
    return test.dataValues;
  }
  async getAllBook() {
    return await this.bookModel.findAll(this.option);
  }
}
