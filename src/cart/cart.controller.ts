import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto } from "./dto/cart.dto";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { CurrentUser } from "../users/decorator/user.decorator";
import { RefreshTokenGuard } from "../auth/common/refreshToken.guard";
import { jwtDecode } from "jwt-decode";

@Controller("cart")
export class CartController {
  constructor(
    private readonly cartService: CartService
  ) {
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  async createCart(@Body() dto: CartDto, @CurrentUser("sub") id: number): Promise<any> {
    return await this.cartService.createCart(dto.bookId, id);
  }
  @Get("/count")
  @UseGuards(AccessTokenGuard)
  async getCount(@CurrentUser("sub") id: number): Promise<any> {
    return await this.cartService.getCount(id);
  }
}
