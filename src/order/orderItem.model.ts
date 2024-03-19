import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Book } from "../book/book.model";
import { Order } from "./order.model";

interface OrderItemCreationAttrs {
  bookId: number;
  userId: number;
}
@Table({ tableName: "orderItem",updatedAt: false})
export class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
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
  @ForeignKey(() => Order)
  @Column
  orderId: number;
  @BelongsTo(() => Order)
  order: Order;
}