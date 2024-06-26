import { Injectable } from "@nestjs/common";
import { orderDto } from "./dto/order.dto";
import { Order } from "./order.model";
import { InjectModel } from "@nestjs/sequelize";
import { OrderItem } from "./orderItem.model";
import { Book } from "../book/book.model";
import { Image } from "../image/image.model";
import { Author } from "../author/author.model";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
    @InjectModel(OrderItem)
    private orderItemModel: typeof OrderItem
  ) {

  }

  async createOrder(dto: orderDto, userId: number) {
    const order = await this.orderModel.create({
      userId: userId,
      subtotal: dto.subtotal,
      shippingPrice: dto.shippingPrice
    });
    for (const book of dto.books) {
      await this.orderItemModel.create({ bookId: book.bookId, quantity: book.quantity, orderId: order.id });
    }
  }

  async getOrders(id: number) {
    const orders = await this.orderModel.findAll({
      where: { userId: id }, include: [
        {
          model: OrderItem,
          include: [
            {
              model: Book,
              include: [Image, Author]
            }
          ]
        }
      ]

    });
    return orders;
    // return orders.reduce((acc, obj) => {
    //   acc.push(...obj.orderItems);
    //   return acc;
    // }, []);
  }
}
