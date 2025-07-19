import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  create(@Body() profile: Profile) {
    return this.profileService.create(profile);
  }

  @Get()
  findAll() {
    return this.profileService.findAll();
  }
}