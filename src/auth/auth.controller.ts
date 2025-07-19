import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() user: any) {
    return this.authService.register(user);
  }

  @Post('debug-login')
  async debugLogin(@Body() body: any) {
    console.log('Raw body:', body);
    const user = await this.authService.validateUser(body.username, body.password);
    return { user };
  }
}