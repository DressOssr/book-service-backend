import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Cart } from "./cart.model";
import { Book } from "../book/book.model";
import { Image } from "../image/image.model";
import { Author } from "../author/author.model";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart
  ) {
  }

  async createCart(bookId: number, userId: number) {
    return await this.cartModel.create({ bookId, userId }, {
      include: [{
        model: Book,
        include: [Image]
      }]
    });
  }

  async getCount(id: number) {
    return this.cartModel.count({ where: { userId: id } });
  }

  async getUserCartItems(id: number) {
    return this.cartModel.findAll({
      where: {
        userId: id
      },
      include: [{
        model: Book,
        include: [Image]
      }]
    });
  }

  async deleteById(id: number) {
    return this.cartModel.destroy({ where: { id } });
  }
  async clearCart(id: number) {
    await this.cartModel.destroy({ where: { userId: id } });
  }
}
