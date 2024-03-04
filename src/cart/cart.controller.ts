import { Body, Controller, Post } from "@nestjs/common";
import { CartService } from "./cart.service";
import { CartDto } from "./dto/cart.dto";

@Controller("cart")
export class CartController {
  constructor(
    private readonly cartService: CartService
  ) {
  }
  @Post()
  async createCart(@Body() dto: CartDto){
    return await this.cartService.createCart({ ...dto })
  }
}
