import {Column, DataType, Table, Model, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../role/role.model";

interface UserCreationAttrs {
    emails:string,
    password:string
}
@Table({tableName: "users"})
export class User extends Model<User,UserCreationAttrs> {
    @ApiProperty({example: '1', description: "User identifier", nullable: false })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@google.com', description: "User email", nullable: false })
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 'password', description: "User password", nullable: false })
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string;

    @ApiProperty({ description: "Jwt Refresh Token" })
    @Column({type: DataType.STRING, unique: false})
    refreshToken: string;

    @ForeignKey(()=>Role)
    @Column({type:DataType.INTEGER})
    roleId:number


    @BelongsTo(()=>Role)
    role:Role
}