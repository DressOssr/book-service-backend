import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {Request} from 'express';
import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RefreshTokenStrategy.extractJWTFromCookie,
            ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            ignoreExpiration:false,
            passReqToCallback: true
        });
    }
    private static extractJWTFromCookie(req: Request): string | null {
        if (req.cookies && req.cookies["jwt-secure"]) {
            return req.cookies["jwt-secure"];
        }
        return null;
    }
    validate(req:Request,payload: any) {
        const refreshToken = req.cookies && req.cookies["jwt-secure"];
        if (!refreshToken) {
            throw new ForbiddenException('No refresh token found in cookies');
        }
        return { ...payload, refreshToken };
    }
}