import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({required: false})
  id?: number;

  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  roleId!: number;
}
