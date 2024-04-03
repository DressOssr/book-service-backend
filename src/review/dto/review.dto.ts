import { IsNumber, IsString } from "class-validator";

export class ReviewDto {
  @IsNumber()
  rating: number;
  @IsNumber()
  bookId: number;
  @IsString()
  reviewText: string;
  @IsString()
  name: string;
}