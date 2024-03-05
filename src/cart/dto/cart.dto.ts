import { IsNumber } from "class-validator";

export class CartDto{
  @IsNumber()
  bookId:number;
}

