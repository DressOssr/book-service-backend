import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {User} from "./user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../role/role.model";
import {RoleModule} from "../role/role.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        SequelizeModule.forFeature([User, Role]),
        RoleModule,
        forwardRef(()=>AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService]

})
export class UsersModule {
}
