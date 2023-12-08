import {Column, DataType, Table, Model, BelongsTo, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/user.model";

interface RoleCreationAttrs {
    role:string,
    description:string
}
@Table({tableName: "roles"})
export class Role extends Model<Role,RoleCreationAttrs> {
    @ApiProperty({example: 'Role id', nullable: false })
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ADMIN', description: "Role user", nullable: false })
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    role: string;

    @ApiProperty({example: 'Administrator', nullable: false })
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    description: string;

    @HasMany(()=>User)
    user:User[]
}