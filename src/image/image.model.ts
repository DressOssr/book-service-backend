import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";

import { Book } from "../book/book.model";


class ImageCreationAttrs {

}
@Table({tableName: "image"})
export class Image extends Model<Image,ImageCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number
  @Column({type: DataType.STRING})
  fileName: string
  @Column({type: DataType.BLOB})
  buffer: Buffer
  @HasOne(() => Book)
  book: Book
}