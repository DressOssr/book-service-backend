import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { BookAuthor } from "../author/bookAuthor.model";
import { BookCategory } from "./bookCategory.model";
interface CategoryCreationAttrs {
  value:string,
}
@Table({tableName:"category"})
export class Category extends Model<Category,CategoryCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING})
  value: string;
  @BelongsToMany(() => Book, () => BookCategory)
  books: Array<Book & {BookCategory: BookCategory}>;
}