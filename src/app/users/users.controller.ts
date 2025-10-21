import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Auth, AuthWithRoles, CurrentUser, Public } from '../auth/decorators/auth.decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: Partial<User>) {
    return this.usersService.create(createUserDto);
  }

  @Auth()
  @Get()
  findAll(@CurrentUser() user: any) {
    console.log('Usuario autenticado:', user);
    return this.usersService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.usersService.findOne(+id);
  }

  @AuthWithRoles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(+id, updateUserDto);
  }

  @AuthWithRoles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Auth()
  @Get('profile/me')
  getMyProfile(@CurrentUser() user: any) {
    return {
      message: 'Este es tu perfil',
      user: user,
      timestamp: new Date().toISOString()
    };
  }
}
