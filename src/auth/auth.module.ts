import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {AccessTokenStrategy} from "./strategy/accessToken.strategy";
import {RefreshTokenStrategy} from "./strategy/refreshToken.strategy";
import {JwtModule, JwtService} from "@nestjs/jwt";
import process from "process";
import {RoleModule} from "../role/role.module";

@Module({
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy,],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UsersModule),
        forwardRef(() => RoleModule),
        JwtModule.register({}),
    ],
    exports: [
        AuthService,
        JwtModule
    ]

})
export class AuthModule {
}
