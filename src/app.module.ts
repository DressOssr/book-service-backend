import { Module } from "@nestjs/common";

import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import * as process from "process";
import { User } from "./users/user.model";
import { RoleModule } from "./role/role.module";
import { Role } from "./role/role.model";
import { AuthModule } from "./auth/auth.module";
import { BookController } from './book/book.controller';
import { BookModule } from './book/book.module';

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
        models: [User, Role],
        synchronize: true,
        autoLoadModels: true,
        logging: console.log,
        sync: { force: false, alter: true }
      }),
      UsersModule,
      RoleModule,
      AuthModule,
      BookModule
    ],
  controllers: [BookController],
  providers: []
})
export class AppModule {
}
