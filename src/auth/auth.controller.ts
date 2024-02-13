import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AccessTokenGuard } from "./common/accessToken.guard";
import { RefreshTokenGuard } from "./common/refreshToken.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("signup")
  async signup(@Res() res, @Body() createUserDto: CreateUserDto) {
    const {newUser,tokens} = await this.authService.signUp(createUserDto);
    try {
      res.cookie("jwt-secure", tokens.refreshToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true
      });
      const userSubset = {
        id: newUser.id,
        email: newUser.email,
        roleId: newUser.roleId
      };
      return res.send({
        user:{
          ...userSubset
        },
        accessToken:tokens.accessToken
      });
    } catch (e) {
      throw e;
    }
  }

  @Post("signin")
  async signin(@Res() res, @Body() data: LoginDto) {
    const {user,tokens} = await this.authService.signIn(data);
    try {

      res.cookie("jwt-secure", tokens.refreshToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true
      });
      const userSubset = {
        id: user.id,
        email: user.email,
        roleId: user.roleId
      };
      return res.send({
        user:{
          ...userSubset
        },
        accessToken:tokens.accessToken
      });
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(AccessTokenGuard)
  @Get("logout")
  logout(@Req() req: Request) {
    this.authService.logout(req.user["sub"]);
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  async refreshTokens(@Req() req: Request, @Res() res) {
    const userId = req.user["sub"];
    const refreshToken = req.user["refreshToken"];
    const token = await this.authService.refreshToken(userId, refreshToken);
    const accessToken = token.accessToken
    try {

      res.cookie("jwt-secure", token.refreshToken, {
        expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        sameSite: "strict",
        httpOnly: true
      });
      return res.send({accessToken});
    } catch (e) {
      throw e;
    }
  }
}
