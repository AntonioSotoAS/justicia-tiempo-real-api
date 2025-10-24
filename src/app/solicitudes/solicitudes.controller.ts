import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  ParseEnumPipe 
} from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud, EstadoSolicitud, PrioridadSolicitud } from './entities/solicitud.entity';
import { Auth, AuthWithRoles, CurrentUser, Public } from '../auth/decorators/auth.decorators';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { CronSchedulerService } from './cron-scheduler.service';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(
    private readonly solicitudesService: SolicitudesService,
    private readonly whatsappService: WhatsappService,
    private readonly cronSchedulerService: CronSchedulerService
  ) {}

  @Public()
  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudesService.create(createSolicitudDto);
  }


  @Auth()
  @Get()
  findAll(
    @Query('estado') estado?: EstadoSolicitud,
    @Query('prioridad') prioridad?: PrioridadSolicitud,
    @CurrentUser() user?: any
  ) {
    if (estado) {
      return this.solicitudesService.findByEstado(estado);
    }
    if (prioridad) {
      return this.solicitudesService.findByPrioridad(prioridad);
    }
    return this.solicitudesService.findAll();
  }

  @Auth()
  @Get('estadisticas')
  getEstadisticas(@CurrentUser() user: any) {
    return this.solicitudesService.getEstadisticas();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.solicitudesService.findOne(+id);
  }

  @AuthWithRoles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudesService.update(+id, updateSolicitudDto);
  }

  @AuthWithRoles('admin')
  @Patch(':id/estado')
  updateEstado(
    @Param('id') id: string, 
    @Body('estado', new ParseEnumPipe(EstadoSolicitud)) estado: EstadoSolicitud
  ) {
    return this.solicitudesService.updateEstado(+id, estado);
  }

  @AuthWithRoles('admin')
  @Patch(':id/prioridad')
  updatePrioridad(
    @Param('id') id: string, 
    @Body('prioridad', new ParseEnumPipe(PrioridadSolicitud)) prioridad: PrioridadSolicitud
  ) {
    return this.solicitudesService.updatePrioridad(+id, prioridad);
  }

  @AuthWithRoles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudesService.remove(+id);
  }

  @AuthWithRoles('admin')
  @Post(':id/enviar-whatsapp')
  async enviarWhatsapp(@Param('id') id: string) {
    const solicitud = await this.solicitudesService.findOne(+id);
    if (!solicitud) {
      throw new Error('Solicitud no encontrada');
    }

    const datosWhatsapp = await this.solicitudesService.generarDatosWhatsapp(solicitud);
    const resultado = await this.whatsappService.enviarMensajeConEvolution(+id, datosWhatsapp);

    if (resultado.success) {
      return {
        success: true,
        solicitudId: +id,
        messageId: resultado.messageId,
        estado: 'enviado',
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        success: false,
        solicitudId: +id,
        error: resultado.error,
        estado: 'fallido',
        timestamp: new Date().toISOString()
      };
    }
  }

  @AuthWithRoles('admin')
  @Post(':id/previsualizar-whatsapp')
  async previsualizarWhatsapp(@Param('id') id: string) {
    const solicitud = await this.solicitudesService.findOne(+id);
    if (!solicitud) {
      throw new Error('Solicitud no encontrada');
    }

    const datosWhatsapp = await this.solicitudesService.generarDatosWhatsapp(solicitud);
    const resultado = await this.whatsappService.enviarMensaje(datosWhatsapp);

    return {
      success: true,
      solicitudId: +id,
      mensaje: resultado.mensaje,
      numeroDestino: resultado.numeroDestino,
      datos: datosWhatsapp,
      timestamp: new Date().toISOString()
    };
  }

  @AuthWithRoles('admin')
  @Get(':id/estado-whatsapp')
  async verificarEstadoWhatsapp(@Param('id') id: string) {
    const resultado = await this.whatsappService.verificarEstadoMensaje(+id);
    
    return {
      success: true,
      solicitudId: +id,
      estado: resultado.estado,
      detalles: resultado.detalles,
      timestamp: new Date().toISOString()
    };
  }

  @AuthWithRoles('admin')
  @Post(':id/reenviar-whatsapp')
  async reenviarWhatsapp(@Param('id') id: string) {
    const resultado = await this.whatsappService.reenviarMensaje(+id);
    
    if (resultado.success) {
      return {
        success: true,
        solicitudId: +id,
        estado: 'reenviado',
        timestamp: new Date().toISOString()
      };
    } else {
      return {
        success: false,
        solicitudId: +id,
        error: resultado.error,
        estado: 'error_reenvio',
        timestamp: new Date().toISOString()
      };
    }
  }

  @AuthWithRoles('admin')
  @Post('cola/procesar')
  async procesarColaManual() {
    await this.cronSchedulerService.procesarColaManual();
    return {
      success: true,
      message: 'Procesamiento manual de cola iniciado',
      timestamp: new Date().toISOString()
    };
  }

  @AuthWithRoles('admin')
  @Get('cola/estadisticas')
  async obtenerEstadisticasCola() {
    const estadisticas = await this.cronSchedulerService.obtenerEstadisticas();
    return {
      success: true,
      estadisticas,
      timestamp: new Date().toISOString()
    };
  }
}
