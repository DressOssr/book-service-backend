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

  async getAllFavoriteByUserId(userId: number) {
    return await this.favoriteModel.findAll({ where: { userId } });
  }

  async deleteFavoriteByUserId(id: number) {
    return await this.favoriteModel.destroy({ where: { id } });
  }

  async isExist(id: number, userId: number) {
    return this.favoriteModel.count({ where: { bookId: id, userId } })
      .then((count) => {
        return count !== 0;
      });
  }
}
