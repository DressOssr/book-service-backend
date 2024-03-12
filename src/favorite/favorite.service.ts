import { Injectable } from "@nestjs/common";
import { Favorite } from "./favorite.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite)
    private favoriteModel: typeof Favorite
  ) {
  }
  async create(bookId: number, userId: number) {
    return await this.favoriteModel.create({ bookId, userId });
  }
}
