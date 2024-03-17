import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from "sequelize-typescript";
import { Book } from "../book/book.model";
import { User } from "../users/user.model";

class ReviewCreationAttrs {
  bookId: number;
  userId : number;
}

@Table({ tableName: "review" })
export class Review extends Model<Review, ReviewCreationAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
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
