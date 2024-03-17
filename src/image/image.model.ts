import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";

import { Book } from "../book/book.model";


class ImageCreationAttrs {
  fileName: string;
  buffer: string;
}
@Table({tableName: "image"})
export class Image extends Model<Image,ImageCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({type: DataType.STRING})
  fileName: string
  @Column({type: DataType.TEXT})
  buffer: string
  @HasOne(() => Book)
  book: Book
}