import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { BookAuthor } from "../author/bookAuthor.model";
import { Author } from "../author/author.model";
import { BookCategory } from "../category/bookCategory.model";
import { Category } from "../category/category.model";
import { BookDto } from "./dto/book.dto";

export interface BookCreationAttrs {
  title: string
  subtitle: string
  price:number
  publishedDate: string
  description: string
  image: string
  publisher: string
}
@Table({tableName: "books"})
export class Book extends Model<Book,BookCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({type: DataType.STRING})
  title: string
  @Column({type: DataType.STRING,allowNull:true})
  subtitle: string
  @Column({type:DataType.DECIMAL})
  price:number
  @Column({type:DataType.DATE})
  publishedDate: string
  @Column({type:DataType.STRING})
  description: string
  @Column({type:DataType.STRING})
  image: string
  @Column({type:DataType.STRING})
  publisher: string
  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Array<Author & {BookAuthor: BookAuthor}>;
  @BelongsToMany(() => Category, () => BookCategory)
  categories: Array<Category & {BookCategory: BookCategory}>;
}