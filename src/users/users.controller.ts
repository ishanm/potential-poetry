import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('')
  async signupUser(
    @Body() userData: { name: string; email: string },
  ): Promise<{ token }> {
    return {
      token: await this.userService.registerUser(userData),
    };
  }
}
