import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud, EstadoSolicitud } from './entities/solicitud.entity';
import { WhatsappService } from '../whatsapp/whatsapp.service';

@Injectable()
export class ColaProcesamientoService {
  private readonly logger = new Logger(ColaProcesamientoService.name);
  private isProcessing = false;

  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
    private readonly whatsappService: WhatsappService,
  ) {}

  /**
   * Procesa una solicitud de la cola
   */
  async procesarSolicitud(solicitud: Solicitud): Promise<boolean> {
    try {
      this.logger.log(`Procesando solicitud ID: ${solicitud.id} - ${solicitud.nombre_completo}`);

      // Verificar si es momento de enviar
      if (!this.esMomentoDeEnviar(solicitud)) {
        this.logger.log(`Solicitud ${solicitud.id} no es momento de enviar aún`);
        return false;
      }

      // Generar datos de WhatsApp
      const datosWhatsapp = await this.whatsappService.generarDatosDesdeSolicitud(solicitud);
      
      // Enviar mensaje
      const resultado = await this.whatsappService.enviarMensajeConEvolution(solicitud.id, datosWhatsapp);

      if (resultado.success) {
        this.logger.log(`Solicitud ${solicitud.id} enviada exitosamente`);
        return true;
      } else {
        this.logger.error(`Error enviando solicitud ${solicitud.id}: ${resultado.error}`);
        return false;
      }
    } catch (error) {
      this.logger.error(`Error procesando solicitud ${solicitud.id}: ${error.message}`);
      return false;
    }
  }

  /**
   * Verifica si es momento de enviar la solicitud
   */
  private esMomentoDeEnviar(solicitud: Solicitud): boolean {
    const ahora = new Date();
    
    // Si no tiene fecha de envío, no enviar
    if (!solicitud.fechaEnvio) {
      return false;
    }

    // Verificar fecha
    const fechaEnvio = new Date(solicitud.fechaEnvio);
    const fechaActual = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const fechaEnvioSolo = new Date(fechaEnvio.getFullYear(), fechaEnvio.getMonth(), fechaEnvio.getDate());

    // Si la fecha de envío es futura, no enviar
    if (fechaEnvioSolo > fechaActual) {
      return false;
    }

    // Si la fecha de envío es hoy, verificar la hora
    if (fechaEnvioSolo.getTime() === fechaActual.getTime()) {
      if (solicitud.horaEnvio) {
        const [hora, minuto] = solicitud.horaEnvio.split(':').map(Number);
        const horaEnvio = new Date();
        horaEnvio.setHours(hora, minuto, 0, 0);

        // Si la hora de envío aún no ha llegado, no enviar
        if (ahora < horaEnvio) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Obtiene la siguiente solicitud pendiente para procesar
   */
  async obtenerSiguienteSolicitud(): Promise<Solicitud | null> {
    return await this.solicitudRepository.findOne({
      where: { estado: EstadoSolicitud.PENDIENTE },
      order: { createdAt: 'ASC' }
    });
  }

  /**
   * Procesa la cola de solicitudes (una por una)
   */
  async procesarCola(): Promise<void> {
    if (this.isProcessing) {
      this.logger.log('Ya hay un proceso de cola en ejecución, saltando...');
      return;
    }

    this.isProcessing = true;
    this.logger.log('Iniciando procesamiento de cola...');

    try {
      const solicitud = await this.obtenerSiguienteSolicitud();
      
      if (!solicitud) {
        this.logger.log('No hay solicitudes pendientes en la cola');
        return;
      }

      await this.procesarSolicitud(solicitud);
    } catch (error) {
      this.logger.error(`Error en procesamiento de cola: ${error.message}`);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Obtiene estadísticas de la cola
   */
  async obtenerEstadisticasCola() {
    const pendientes = await this.solicitudRepository.count({ 
      where: { estado: EstadoSolicitud.PENDIENTE } 
    });
    
    const enviando = await this.solicitudRepository.count({ 
      where: { estado: EstadoSolicitud.ENVIANDO } 
    });

    const proximasEnviar = await this.solicitudRepository.find({
      where: { estado: EstadoSolicitud.PENDIENTE },
      order: { fechaEnvio: 'ASC', horaEnvio: 'ASC' },
      take: 5,
      select: ['id', 'nombre_completo', 'fechaEnvio', 'horaEnvio']
    });

    return {
      pendientes,
      enviando,
      proximasEnviar,
      procesando: this.isProcessing
    };
  }
}
