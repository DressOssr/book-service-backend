import { IsString } from "class-validator";

export class AuthorDto{
  @IsString()
  firstName:string
  @IsString()
  lastName:string
  @IsString()
  gender:string
}