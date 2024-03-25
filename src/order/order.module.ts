import { Module } from '@nestjs/common';
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order } from "./order.model";
import { OrderItem } from "./orderItem.model";
import { CartModule } from "../cart/cart.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Order,OrderItem]),
    CartModule,
  ],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {

}
