import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BookCreationAttrs {
  role:string,
    description:string
}
@Table({tableName: "books"})
export class Book extends Model<Book,BookCreationAttrs>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;
  @Column
  age: number;
}