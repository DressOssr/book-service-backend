import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RoleService} from "../role/role.service";
import {UpdateUserDto} from "./dto/update-user.dto";


Injectable()

export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private roleService: RoleService
    ) {
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = this.userModel.build(dto);
        const role = await this.roleService.findByRole("USER")
        user.set({
            roleId: role.id
        })
        await user.save();
        return user;
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.findAll({
            include: {all: true},
            attributes:{ exclude: ['refreshToken',"password"]}
        });
    }

    async findById(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    async findByEmail(value: string): Promise<User> {
        return await this.userModel.findOne({
            where: {
                email: value
            },
        });
    }

    async removeUser(id: number): Promise<void> {
        const user = await this.findById(id);
        await user.destroy();
    }


    async update(id: number, updateDto: UpdateUserDto) {
        const user = await this.findById(id);
        user.set({
            refreshToken: updateDto.refreshToke //TODO
        });
        await user.save()
        return user;
    }
}
