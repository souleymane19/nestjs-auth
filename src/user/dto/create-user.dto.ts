export class CreateUserDto {
  id?: number;
  name: string;
  email: string;
  roleId!: number;
}
