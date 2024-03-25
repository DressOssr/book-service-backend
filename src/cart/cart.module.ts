import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { Cart } from "./cart.model";

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService]
})
export class CartModule {

}
