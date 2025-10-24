import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from '../auth/decorators/auth.decorators';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Controller('seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly whatsappService: WhatsappService
  ) {}

  @Post('users')
  @Public()
  async seedUsers() {
    await this.seedService.seedUsers();
    return { message: 'Usuarios de prueba creados exitosamente' };
  }

  @Post('whatsapp-plantillas')
  @Public()
  async seedWhatsappPlantillas() {
    // Las plantillas ahora están hardcodeadas en archivos TS - no necesitan inicialización
    return { message: 'Las plantillas están disponibles en archivos TypeScript' };
  }
}
