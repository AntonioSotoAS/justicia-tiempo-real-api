import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EstadisticaController } from './estadistica.controller';
import { EstadisticaService } from './estadistica.service';

@Module({
  imports: [HttpModule],
  controllers: [EstadisticaController],
  providers: [EstadisticaService],
  exports: [EstadisticaService],
})
export class EstadisticaModule {}
