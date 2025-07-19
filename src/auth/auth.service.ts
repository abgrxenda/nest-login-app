import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log('AuthService.validateUser called', { username });
    const user = await this.usersService.findOne(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      console.log('Password match:', isMatch);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && (await bcrypt.compare(pass, user.password))) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async register(user: any) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return this.usersService.create({ ...user, password: hashedPassword });
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT' && error.errno === 19) {
        throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}