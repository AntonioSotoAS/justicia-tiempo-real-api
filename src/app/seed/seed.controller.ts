import { Controller, Post, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from '../auth/decorators/auth.decorators';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Public()
  @Post('run')
  async runSeed() {
    await this.seedService.runSeed();
    return {
      message: 'Seed ejecutado exitosamente',
      timestamp: new Date().toISOString()
    };
  }

  @Public()
  @Post('superadmin')
  async createSuperAdmin() {
    const superAdmin = await this.seedService.createSuperAdmin();
    return {
      message: 'Superadmin creado/verificado',
      user: {
        id: superAdmin.id,
        name: superAdmin.name,
        email: superAdmin.email,
        role: superAdmin.role,
        isActive: superAdmin.isActive
      }
    };
  }

  @Public()
  @Post('test-users')
  async createTestUsers() {
    const users = await this.seedService.createTestUsers();
    return {
      message: 'Usuarios de prueba creados/verificados',
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      }))
    };
  }

  @Public()
  @Get('info')
  getSeedInfo() {
    return {
      message: 'Endpoints de Seed disponibles',
      endpoints: {
        'POST /seed/run': 'Ejecuta todo el proceso de seed',
        'POST /seed/superadmin': 'Crea solo el superadmin',
        'POST /seed/test-users': 'Crea solo usuarios de prueba',
        'GET /seed/info': 'Información de endpoints'
      },
      credentials: {
        superadmin: {
          email: 'superadmin@justibot.com',
          password: 'superadmin123',
          role: 'superadmin'
        },
        admin: {
          email: 'admin@justibot.com',
          password: 'admin123',
          role: 'admin'
        },
        user: {
          email: 'user@justibot.com',
          password: 'user123',
          role: 'user'
        },
        moderator: {
          email: 'moderator@justibot.com',
          password: 'moderator123',
          role: 'moderator'
        }
      }
    };
  }
}
