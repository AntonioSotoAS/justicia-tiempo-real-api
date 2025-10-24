import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { PlantillaWhatsapp } from './entities/plantilla-whatsapp.entity';
import { EvolutionApiService } from './evolution-api.service';
import { Solicitud } from '../solicitudes/entities/solicitud.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantillaWhatsapp, Solicitud])],
  controllers: [WhatsappController],
  providers: [WhatsappService, EvolutionApiService],
  exports: [WhatsappService, EvolutionApiService],
})
export class WhatsappModule {}
