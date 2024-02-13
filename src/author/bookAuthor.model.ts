import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { Author } from "./author.model";

@Table({tableName:"bookAuthor"})
export class BookAuthor extends Model<BookAuthor>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ForeignKey(() => Book)
  @Column({type: DataType.INTEGER})
  bookId: number;
  @ForeignKey(() => Author)
  @Column({type: DataType.INTEGER})
  authorId: number;
}