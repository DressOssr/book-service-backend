import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { BookAuthor } from "./bookAuthor.model";

interface AuthorCreationAttrs {
  firstName:string
  lastName:string,
  gender:string
}
@Table({tableName:"author"})
export class Author extends Model<Author,AuthorCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column({type: DataType.STRING})
  lastName: string;
  @Column({type: DataType.STRING})
  firstName: string;
  @Column({type: DataType.STRING})
  gender: string;
  @BelongsToMany(() => Book, () => BookAuthor)
  books: Array<Book & {BookAuthor: BookAuthor}>;
}