import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule as MainAppModule } from './app/app.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Conexión única a la base de datos principal
    TypeOrmModule.forRoot(databaseConfig),
    
    // Módulo principal
    MainAppModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
