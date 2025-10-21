import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
export class SeedRunnerService implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    // Ejecutar seed automáticamente al iniciar la aplicación
    await this.seedService.seedUsers();
  }
}
