import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book, BookCreationAttrs } from "./book.model";
import { BookAuthor } from "../author/bookAuthor.model";
import { BookCategory } from "../category/bookCategory.model";
import { Author } from "../author/author.model";
import { Category } from "../category/category.model";

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
    @InjectModel(BookAuthor)
    private bookAuthorModel: typeof BookAuthor,
    @InjectModel(BookCategory)
    private bookCategoryModel: typeof BookCategory
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
      }
    ]
  }
  async createBook(dto: BookCreationAttrs) {
    return await this.bookModel.create(dto);
  }

  async addToBookAuthor(id: number, authorsId: number[]) {
    const obj = authorsId.map(number => (
      { bookId: id, authorId: number }
    ));
    return await this.bookAuthorModel.bulkCreate(obj);
  }

  async addToBookCategory(id: number, categoryId: number[]) {
    const obj = categoryId.map(number => (
      { bookId: id, categoryId: number }
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
