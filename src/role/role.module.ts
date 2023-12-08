import {Module} from '@nestjs/common';
import {RoleController} from './role.controller';
import {RoleService} from "./role.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {Role} from "./role.model";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Role, User])
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService]
})
export class RoleModule {
}
