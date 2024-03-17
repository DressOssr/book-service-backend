import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { BookCategory } from "../category/bookCategory.model";
import { User } from "../users/user.model";

interface FavoriteCreationAttrs {

}
@Table({tableName:"favorite",indexes: [{ unique: true, fields: ["userId", "bookId"] }]})
export class Favorite extends Model<Favorite,FavoriteCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @ForeignKey(() => User)
  userId: number;
  @BelongsTo(() => User)
  user: User;
  @ForeignKey(() => Book)
  bookId: number;
  @BelongsTo(() => Book)
  book: Book;
}