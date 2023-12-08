import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import * as process from "process";
import {RoleService} from "../role/role.service";
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {

    private readonly salt = 5;
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private roleService:RoleService
    ) {
    }

    async signUp(userDto: CreateUserDto) {

        const existUser = await this.userService.findByEmail(userDto.email);
        if (existUser) {
            throw new BadRequestException("User is exist");
        }

        const hashPassword = await this.hashData(userDto.password, 10);
        const newUser = await this.userService.createUser({...userDto, password: hashPassword});
        const userRole = await this.roleService.findById(newUser.roleId);
        const tokens = await this.getTokens(newUser.id, newUser.email,userRole.role);

        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return {newUser,tokens};
    }
    async signIn(data: LoginDto) {
        const user = await this.userService.findByEmail(data.email);
        if (!user) throw new BadRequestException('User does not exist');

        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches)
            throw new BadRequestException('Password is incorrect');
        const userRole = await this.roleService.findById(user.roleId);

        const tokens = await this.getTokens(user.id, user.email,userRole.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {user,tokens};
    }
    async getTokens(userId: number, email: string,role:string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    role

                },
                {
                    secret:process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    role
                },
                {
                    secret: process.env.JWT_REFRESH_SECRET,
                    expiresIn: '7d',
                },
            ),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }

    async hashData(data: string, salt: number) {
        return argon2.hash(data);
    }

    private async updateRefreshToken(userId: number, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken, 10);
        await this.userService.update(userId, {
            refreshToke: hashedRefreshToken
        })
    }

    async logout(userId: number) {
        return this.userService.update(userId, {
            refreshToke: null
        });
    }

    async refreshToken(userId: number, refreshToken: string) {
        const user = await this.userService.findById(userId);
        if (!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied');
        const refreshTokenMatches = await argon2.verify(
          user.refreshToken,
          refreshToken,
        );
        if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
        const userRole = await this.roleService.findById(user.roleId);
        const tokens = await this.getTokens(user.id, user.email,userRole.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
    }
}