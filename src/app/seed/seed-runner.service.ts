import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
export class SeedRunnerService implements OnModuleInit {
  constructor(private readonly seedService: SeedService) {}

  async onModuleInit() {
    // Solo ejecutar en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('🌱 Ejecutando seed automático en desarrollo...');
      
      try {
        await this.seedService.runSeed();
        console.log('✅ Seed automático completado');
      } catch (error) {
        console.log('⚠️ Seed automático falló (puede ser normal si ya existen los usuarios):', error.message);
      }
    }
  }
}
