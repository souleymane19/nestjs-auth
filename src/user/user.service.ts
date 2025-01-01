import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private logger = new Logger('User service');

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    try {
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hash,
        },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async findAll() {
    this.logger.log('getAllUsers');
    const users = await this.prisma.user.findMany();
    return users;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  async findOne(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
