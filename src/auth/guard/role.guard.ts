import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";
import * as process from "process";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "../role-auth.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try {
            const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ])
            if(!requiredRole){
                return true
            }
            const authHeader: string = request.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({message: "User is not authorized"})
            }
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: "User is not authorized"})
            }
            const user = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
            request.user = user;
            return requiredRole.includes(user.role);
        } catch (e) {
            console.log(e);
            throw new UnauthorizedException({message: "User is not authorized"})
        }
    }
}