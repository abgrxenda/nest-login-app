import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async create(user: Partial<User>) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  // src/users/users.service.ts
  async update(username: string, user: Partial<User>): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({ username });
    if (!existingUser) {
      throw new Error(`User with username '${username}' not found`);
    }

    // 🔐 Hash the password if it's being updated
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
      console.log(user.password);
    }

    await this.usersRepository.update({username}, user);
    const updatedUser = await this.usersRepository.findOneBy({ username });
    return updatedUser!;
  }
}