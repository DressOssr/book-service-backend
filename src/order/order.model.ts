import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../users/user.model";
import { OrderItem } from "./orderItem.model";

class OrderCreationAttrs {
  userId: number;
  subtotal: number;
  shippingPrice: number;
}

@Table({ tableName: "order" ,updatedAt: false})
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @BelongsTo(() => User)
  user: User;
  @Column({ type: DataType.INTEGER })
  subtotal: number;
  @Column({ type: DataType.INTEGER })
  shippingPrice: number;
  @ForeignKey(() => User)
  userId: number;
  @HasMany(()=>OrderItem)
  OrderItems: OrderItem[];
}
