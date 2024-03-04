import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../users/user.model";

interface CartCreationAttrs {
  bookId: number;
  userId: number;
}
@Table({ tableName: "cart", indexes: [{ unique: true, fields: ["userId", "bookId"] }] })
export class Cart extends Model<Cart, CartCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  quantity: number;
  @BelongsTo(() => User)
  user: User;
  @ForeignKey(() => User)
  userId: number;
  @BelongsTo(() => Book)
  book: Book;
  @ForeignKey(() => Book)
  bookId: number;
}