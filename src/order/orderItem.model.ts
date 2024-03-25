import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.model";
import { Book } from "../book/book.model";
import { Order } from "./order.model";

interface OrderItemCreationAttrs {
  bookId: number;
  quantity: number;
  orderId:number;
}
@Table({ tableName: "orderItem",updatedAt: false})
export class OrderItem extends Model<OrderItem, OrderItemCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.INTEGER})
  quantity: number;
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