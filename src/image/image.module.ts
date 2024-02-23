import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Image } from "./image.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Image])
  ],
  providers: [ImageService],
  exports: [ImageService]
})
export class ImageModule {

}
