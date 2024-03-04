import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Author } from "../author/author.model";
import { Cart } from "./cart.model";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart
  ) {
  }
  async createCart({bookId, userId}) {
    return this.cartModel.create({bookId, userId})
  }
}
