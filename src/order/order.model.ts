import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../users/user.model";

class OrderCreationAttrs {
  fileName: string;
  buffer: string;
}

@Table({ tableName: "order" ,updatedAt: false})
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @BelongsTo(() => User)
  user: User;
  @Column({ type: DataType.INTEGER })
  totalPrice: number;
  @ForeignKey(() => User)
  userId: number;
  @ForeignKey(() => Book)
  bookId: number;

}
