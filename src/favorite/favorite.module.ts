import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { Favorite } from "./favorite.model";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";

@Module({
  imports: [
    SequelizeModule.forFeature([Favorite]),
    AuthModule
  ],
  providers: [FavoriteService],
  controllers: [FavoriteController]
})
export class FavoriteModule {
}
