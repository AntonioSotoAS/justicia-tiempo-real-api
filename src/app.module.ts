import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'naruto20',
      database: process.env.DB_DATABASE || 'csjsanta_indicadores',
    
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    
      // ⚠️ evita que se manden NULLs en los SETs
      timezone: 'Z',                 // UTC (seguro)
      charset: 'utf8mb4',            // seguro en MySQL 8/9
      synchronize: false, // Deshabilitado para evitar conflictos con datos existentes
      // Log detallado temporalmente para ver la query que falla
      logging: ['error', 'warn', 'query'],
    }),
    EstadisticasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
