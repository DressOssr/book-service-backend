import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ReviewDto } from "./dto/review.dto";
import { ReviewService } from "./review.service";
import { AccessTokenGuard } from "../auth/common/accessToken.guard";
import { CurrentUser } from "../users/decorator/user.decorator";

@Controller('review')
export class ReviewController {

  constructor(private reviewService: ReviewService) {
  }
  @Post()
  @UseGuards(AccessTokenGuard)
  async createReview(@Body() dto: ReviewDto, @CurrentUser('sub') userId: number){
    return await this.reviewService.createReview(dto, userId);
  }

  @Get(':id')
  async getReviewByBookId(@Param("id") id: number){
    return await this.reviewService.getReviewById(id);
  }
}
