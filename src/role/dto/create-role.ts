import {ApiProperty} from "@nestjs/swagger";

export class CreateRoelDto {
    @ApiProperty({example: 'ADMIN', description: "Role user", nullable: false })
    readonly role: string;
    @ApiProperty({example: 'Administrator', nullable: false })
    readonly description: string;
}