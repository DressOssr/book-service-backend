import { Body, Controller, Delete, Get, Head, Param, Post, UseGuards } from "@nestjs/common";
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

  @Get()
  @UseGuards(AccessTokenGuard)
  async getAllFavoriteByUserId(@CurrentUser("sub") id: number) {
    return await this.favoriteService.getAllFavoriteByUserId(id);
  }

  @Get("/:id")
  @UseGuards(AccessTokenGuard)
  isExist(@Param("id") id: number, @CurrentUser("sub") userId: number) {
    return this.favoriteService.isExist(id, userId);
  }

  @Delete("/:id")
  @UseGuards(AccessTokenGuard)
  async deleteFavoriteId(@Param("id") id: number) {
    return await this.favoriteService.deleteFavoriteByUserId(id);

  }
}
