import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
import { AppModule as MainAppModule } from './app/app.module';
import { estadisticasDbConfig, mainDbConfig } from './config/database.config';

@Module({
  imports: [
    // Conexión a la base de datos de estadísticas (solo lectura)
    TypeOrmModule.forRoot({
      ...estadisticasDbConfig,
      name: 'estadisticas',
    }),
    
    // Conexión a tu base de datos principal (lectura/escritura)
    TypeOrmModule.forRoot({
      ...mainDbConfig,
      name: 'default',
    }),
    
    // Módulos
    EstadisticasModule, // Módulo de estadísticas (usa conexión 'estadisticas')
    MainAppModule,      // Tu módulo principal (usa conexión 'default')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
