import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { FavoriteDto } from "./dto/favorite.dto";
import { FavoriteService } from "./favorite.service";
import { CurrentUser } from "../users/decorator/user.decorator";

@Controller("favorite")
export class FavoriteController {

  constructor(
    private favoriteService: FavoriteService
  ) {

  }

  @Post()
  @UseGuards(AccessTokenGuard)
  async createFavorite(@Body() dto: FavoriteDto, @CurrentUser("sub") id: number) {
    return await this.favoriteService.create(dto.bookId, id);
  }
}
