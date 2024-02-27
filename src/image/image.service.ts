import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Image } from "./image.model";
import { ImageDto } from "./dto/image.dto";
import * as uuid from 'uuid';
@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image)
    private readonly imageModel: typeof Image
  ) {
  }

  async create(dto: ImageDto) {
    const type  = dto.fileName.split(".")[1];
    dto.fileName = uuid.v4() + "." + type;
    dto.buffer = Buffer.from(dto.buffer).toString('base64');
    return this.imageModel.create(dto);
  }
  async getAll() {
   return this.imageModel.findAll();
  }
}
