import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class BookDto{
  @IsString()
  title: string
  @IsOptional()
  @IsString()
  subtitle: string | null
  @IsString()
  price:string
  @IsDateString()
  publishedDate: string
  @IsString()
  description: string
  @IsString()
  publisher: string
  @IsString()
  authorsId:string
  @IsString()
  categoriesId:string
}