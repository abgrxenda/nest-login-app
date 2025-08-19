import { Controller, Get, Put, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Import the User entity

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  @Put(':username')
  async update(
    @Param('username') username: string,
    @Body() userData: Partial<User>,
  ) {
    return this.usersService.update(username, userData);
  }
}