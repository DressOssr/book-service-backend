import { Injectable } from '@nestjs/common';
import { Review } from "./review.model";
import { InjectModel } from "@nestjs/sequelize";
import { ReviewDto } from "./dto/review.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review
  ) {}
  async createReview(dto: ReviewDto,userId:number){
    console.log(dto);
    return await this.reviewModel.create({...dto,userId});
  }

  async getReviewById(id: number) {
    return await this.reviewModel.findAll({where: {bookId: id},attributes: {exclude: ['updatedAt']}})
  }
}
