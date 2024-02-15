import { IsArray, IsDateString, IsNumber, IsString } from "class-validator";

export class BookDto{
  @IsString()
  title: string
  @IsString()
  subtitle: string
  @IsNumber()
  price:number
  @IsDateString()
  publishedDate: string
  @IsString()
  description: string
  @IsString()
  image: string
  @IsString()
  publisher: string
  @IsArray()
  authorsId:number[]
  @IsArray()
  categoriesId:number[]
}