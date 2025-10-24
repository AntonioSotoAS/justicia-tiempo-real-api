import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesService } from './solicitudes.service';
import { SolicitudesController } from './solicitudes.controller';
import { Solicitud } from './entities/solicitud.entity';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { ColaProcesamientoService } from './cola-procesamiento.service';
import { CronSchedulerService } from './cron-scheduler.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitud]),
    WhatsappModule
  ],
  controllers: [SolicitudesController],
  providers: [SolicitudesService, ColaProcesamientoService, CronSchedulerService],
  exports: [SolicitudesService, ColaProcesamientoService, CronSchedulerService]
})
export class SolicitudesModule {}
