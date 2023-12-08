import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'user@google.com', description: "User email", nullable: false })
    readonly email: string;
    @ApiProperty({example: 'password', description: "User password", nullable: false })
    readonly password: string;
}