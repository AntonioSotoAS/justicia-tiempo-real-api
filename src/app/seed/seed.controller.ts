import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from '../auth/decorators/auth.decorators';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('users')
  @Public()
  async seedUsers() {
    await this.seedService.seedUsers();
    return { message: 'Usuarios de prueba creados exitosamente' };
  }
}
