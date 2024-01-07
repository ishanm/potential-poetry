import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  async signupUser(
    @Body() userData: { name: string; email: string },
  ): Promise<User> {
    return this.userService.createUser(userData);
  }
}