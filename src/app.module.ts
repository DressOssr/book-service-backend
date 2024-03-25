import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./users/user.model";
import { RoleModule } from "./role/role.module";
import { Role } from "./role/role.model";
import { AuthModule } from "./auth/auth.module";
import { BookModule } from "./book/book.module";
import { CategoryModule } from "./category/category.module";
import { AuthorModule } from "./author/author.module";
import { ImageModule } from "./image/image.module";
import { CartModule } from "./cart/cart.module";
import { FavoriteModule } from "./favorite/favorite.module";
import { Book } from "./book/book.model";
import { Cart } from "./cart/cart.model";
import { Favorite } from "./favorite/favorite.model";
import { BookAuthor } from "./author/bookAuthor.model";
import { BookCategory } from "./category/bookCategory.model";
import { Author } from "./author/author.model";
import { Category } from "./category/category.model";
import { Image } from "./image/image.model";
import { ReviewController } from "./review/review.controller";
import { ReviewService } from "./review/review.service";
import { ReviewModule } from "./review/review.module";
import { OrderController } from "./order/order.controller";
import { OrderService } from "./order/order.service";
import { OrderModule } from "./order/order.module";
import { Review } from "./review/review.model";
import { OrderItem } from "./order/orderItem.model";
import { Order } from "./order/order.model";


@Module({
  imports:
    [
      ConfigModule.forRoot({
        envFilePath: ".env"
      }),
      SequelizeModule.forRoot({
        dialect: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [User, Role, Cart, Book, Favorite, BookAuthor, BookCategory, Author, Category, Image,Order,OrderItem,Review],
        autoLoadModels: true,
        synchronize: true,
        sync: { force: false, alter: true }
      }),
      UsersModule,
      RoleModule,
      AuthModule,
      BookModule,
      AuthorModule,
      CategoryModule,
      ImageModule,
      CartModule,
      FavoriteModule,
      ReviewModule,
      OrderModule
    ],
  controllers: [],
  providers: []
})
export class AppModule {
}
