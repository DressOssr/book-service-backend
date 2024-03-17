import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../users/user.model";

class OrderCreationAttrs {
  fileName: string;
  buffer: string;
}

@Table({ tableName: "order" })
export class Order extends Model<Order, OrderCreationAttrs> {
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
  @Column({ type: DataType.TEXT })
  reviewText: string;
  @Column({ type: DataType.INTEGER })
  rating: number;
}
