import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { orderDto } from "./dto/order.dto";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { CurrentUser } from "../users/decorator/user.decorator";
import { CartModule } from "../cart/cart.module";
import { CartService } from "../cart/cart.service";

@Controller("order")
export class OrderController {
constructor(
  private orderService: OrderService,
  private cartService: CartService
) {
}

  @Post()
  @UseGuards(AccessTokenGuard)
  async createOrder(@Body() dto: orderDto,@CurrentUser("sub") id: number) {
    await this.orderService.createOrder(dto, id);
    await this.cartService.clearCart(id);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async getOrders(@CurrentUser("sub") id: number){
    return this.orderService.getOrders(id);
  }
}
