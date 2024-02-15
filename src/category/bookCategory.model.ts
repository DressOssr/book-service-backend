import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { Category } from "./category.model";

@Table({tableName:"bookCategory",createdAt:false,updatedAt:false})
export class BookCategory extends Model<BookCategory>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ForeignKey(() => Book)
  @Column({type: DataType.INTEGER})
  bookId: number;
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  categoryId: number;
}