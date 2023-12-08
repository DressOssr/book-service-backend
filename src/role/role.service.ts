import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {CreateRoelDto} from "./dto/create-role";

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role,
    ) {
    }

    async createRole(dto: CreateRoelDto): Promise<Role> {
        return await this.roleModel.create(dto);
    }

    async findAll(): Promise<Role[]> {
        return await this.roleModel.findAll({
            attributes: {exclude: ["createdAt", "updatedAt"]}
        });
    }

    async findById(id: number): Promise<Role> {
        return await this.roleModel.findOne({
            where: {
                id,
            },
        });
    }

    async findByRole(value: string): Promise<Role> {
        return await this.roleModel.findOne({
            where: {
                role: value,
            },
        });
    }

    async remove(id: number): Promise<void> {
        const user = await this.findById(id);
        await user.destroy();
    }
}
