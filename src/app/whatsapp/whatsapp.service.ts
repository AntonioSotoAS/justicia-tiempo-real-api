import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantillaWhatsapp, TipoPlantilla } from './entities/plantilla-whatsapp.entity';
import { EnviarMensajeDto } from './dto/enviar-mensaje.dto';
import { EvolutionApiService, WhatsAppMessage } from './evolution-api.service';
import { Solicitud, EstadoSolicitud } from '../solicitudes/entities/solicitud.entity';
import { obtenerPlantilla, obtenerTodasLasPlantillas } from './plantillas/plantillas';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(
    @InjectRepository(PlantillaWhatsapp)
    private plantillaRepository: Repository<PlantillaWhatsapp>,
    @InjectRepository(Solicitud)
    private solicitudRepository: Repository<Solicitud>,
    private evolutionApiService: EvolutionApiService,
  ) {}

  async obtenerPlantilla(tipo: TipoPlantilla): Promise<{ plantilla: string; tipo: TipoPlantilla }> {
    const plantilla = obtenerPlantilla(tipo);

    if (!plantilla) {
      throw new NotFoundException(`Plantilla de tipo ${tipo} no encontrada`);
    }

    return { plantilla, tipo };
  }

  determinarTipoPlantilla(nivelProductivo: string): TipoPlantilla {
    const nivel = nivelProductivo.toLowerCase();
    
    if (nivel.includes('muy bueno') || nivel.includes('muy bueno')) {
      return TipoPlantilla.MUY_BUENO;
    } else if (nivel.includes('bueno')) {
      return TipoPlantilla.BUENO;
    } else {
      return TipoPlantilla.BAJO;
    }
  }

  procesarPlantilla(plantilla: string, datos: EnviarMensajeDto): string {
    let mensaje = plantilla;

    // Reemplazar variables en la plantilla
    mensaje = mensaje.replace(/\{nombreJuez\}/g, datos.nombreJuez);
    mensaje = mensaje.replace(/\{sexoJuez\}/g, datos.sexoJuez);
    mensaje = mensaje.replace(/\{fechaCorte\}/g, datos.fechaCorte);
    mensaje = mensaje.replace(/\{metaPreliminar\}/g, datos.metaPreliminar.toString());
    mensaje = mensaje.replace(/\{resueltos\}/g, datos.resueltos.toString());
    mensaje = mensaje.replace(/\{avanceMeta\}/g, datos.avanceMeta.toString());
    mensaje = mensaje.replace(/\{nivelProductivo\}/g, datos.nivelProductivo);
    mensaje = mensaje.replace(/\{instancia\}/g, datos.instancia || '');
    mensaje = mensaje.replace(/\{numeroConsulta\}/g, datos.numeroConsulta || '(01) 410-1010 anexo 2245');
    mensaje = mensaje.replace(/\{whatsappConsulta\}/g, datos.whatsappConsulta || '943 189 536');
    mensaje = mensaje.replace(/\{urlRetroalimentacion\}/g, datos.urlRetroalimentacion || 'https://bit.ly/EncuestaDesempenoPJ');
    mensaje = mensaje.replace(/\{brechaMuyBueno\}/g, (datos.brechaMuyBueno || 0).toString());
    mensaje = mensaje.replace(/\{brechaBueno\}/g, (datos.brechaBueno || 0).toString());

    return mensaje;
  }

  async enviarMensaje(datos: EnviarMensajeDto): Promise<{ mensaje: string; numeroDestino: string }> {
    // Determinar el tipo de plantilla basado en el nivel productivo
    const tipoPlantilla = datos.tipoPlantilla || this.determinarTipoPlantilla(datos.nivelProductivo);
    
    // Obtener la plantilla
    const plantilla = await this.obtenerPlantilla(tipoPlantilla);
    
    // Procesar la plantilla con los datos
    const mensajeProcesado = this.procesarPlantilla(plantilla.plantilla, datos);

    return {
      mensaje: mensajeProcesado,
      numeroDestino: datos.numeroWhatsapp
    };
  }

  async enviarMensajeConEvolution(solicitudId: number, datos: EnviarMensajeDto): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      // Actualizar estado a ENVIANDO
      await this.solicitudRepository.update(solicitudId, { 
        estado: EstadoSolicitud.ENVIANDO,
        whatsappError: null 
      });

      // Obtener plantilla y procesar mensaje
      const tipoPlantilla = this.determinarTipoPlantilla(datos.nivelProductivo);
      const plantilla = await this.obtenerPlantilla(tipoPlantilla);
      const mensajeProcesado = this.procesarPlantilla(plantilla.plantilla, datos);

      // Preparar mensaje para Evolution API
      const whatsappMessage: WhatsAppMessage = {
        number: datos.numeroWhatsapp,
        text: mensajeProcesado,
        instance: 'default' // Se puede configurar dinámicamente
      };

      this.logger.log(`Enviando mensaje WhatsApp para solicitud ${solicitudId}`);

      // Enviar mensaje via Evolution API
      const response = await this.evolutionApiService.sendMessage(whatsappMessage);

      if (response.success) {
        // Actualizar solicitud con éxito
        await this.solicitudRepository.update(solicitudId, {
          estado: EstadoSolicitud.ENVIADO,
          whatsappMessageId: response.data?.key?.id || response.data?.messageId || null,
          whatsappSentAt: new Date(),
          whatsappError: null
        });

        this.logger.log(`Mensaje enviado exitosamente para solicitud ${solicitudId}`);
        return {
          success: true,
          messageId: response.data?.key?.id
        };
      } else {
        // Actualizar solicitud con error
        await this.solicitudRepository.update(solicitudId, {
          estado: EstadoSolicitud.FALLIDO,
          whatsappError: response.error || 'Error desconocido al enviar mensaje'
        });

        this.logger.error(`Error enviando mensaje para solicitud ${solicitudId}: ${response.error}`);
        return {
          success: false,
          error: response.error
        };
      }
    } catch (error) {
      // Actualizar solicitud con error
      await this.solicitudRepository.update(solicitudId, {
        estado: EstadoSolicitud.FALLIDO,
        whatsappError: error.message
      });

      this.logger.error(`Error crítico enviando mensaje para solicitud ${solicitudId}: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async verificarEstadoMensaje(solicitudId: number): Promise<{ estado: string; detalles: any }> {
    const solicitud = await this.solicitudRepository.findOne({ where: { id: solicitudId } });
    
    if (!solicitud || !solicitud.whatsappMessageId) {
      return {
        estado: 'no_encontrado',
        detalles: { mensaje: 'Solicitud o mensaje no encontrado' }
      };
    }

    try {
      const response = await this.evolutionApiService.getMessageStatus(solicitud.whatsappMessageId);
      
      if (response.success) {
        // Actualizar timestamps según el estado del mensaje
        const messageData = response.data;
        const updates: Partial<Solicitud> = {};

        if (messageData.status === 'delivered' && !solicitud.whatsappDeliveredAt) {
          updates.whatsappDeliveredAt = new Date();
        }
        
        if (messageData.status === 'read' && !solicitud.whatsappReadAt) {
          updates.whatsappReadAt = new Date();
        }

        if (Object.keys(updates).length > 0) {
          await this.solicitudRepository.update(solicitudId, updates);
        }

        return {
          estado: messageData.status || 'desconocido',
          detalles: messageData
        };
      } else {
        return {
          estado: 'error_verificacion',
          detalles: { error: response.error }
        };
      }
    } catch (error) {
      this.logger.error(`Error verificando estado del mensaje ${solicitudId}: ${error.message}`);
      return {
        estado: 'error',
        detalles: { error: error.message }
      };
    }
  }

  async reenviarMensaje(solicitudId: number): Promise<{ success: boolean; error?: string }> {
    const solicitud = await this.solicitudRepository.findOne({ where: { id: solicitudId } });
    
    if (!solicitud) {
      return { success: false, error: 'Solicitud no encontrada' };
    }

    // Generar datos de WhatsApp desde la solicitud
    const datosWhatsapp = await this.generarDatosDesdeSolicitud(solicitud);
    
    return await this.enviarMensajeConEvolution(solicitudId, datosWhatsapp);
  }

  async generarDatosDesdeSolicitud(solicitud: Solicitud): Promise<EnviarMensajeDto> {
    const metaPreliminar = solicitud.meta_preliminar || 0;
    const resueltos = solicitud.resoluciones || '0';
    const avanceMeta = solicitud.pct_real_avance || 0;

    const nivelProductivo = solicitud.nivel_prod || 'BAJO';

    const brechaMuyBueno = solicitud.niv_muy_bueno || 0;
    const brechaBueno = solicitud.niv_bueno || 0;

    return {
      nombreJuez: solicitud.nombre_completo || 'Juez',
      sexoJuez: solicitud.sexo === 'Femenino' ? 'Dra' : 'Dr',
      fechaCorte: solicitud.fechaCorte ? 
        (typeof solicitud.fechaCorte === 'string' ? solicitud.fechaCorte : solicitud.fechaCorte.toISOString().split('T')[0]) : 
        new Date().toISOString().split('T')[0],
      metaPreliminar,
      resueltos,
      avanceMeta,
      nivelProductivo,
      instancia: solicitud.instancia || '',
      numeroConsulta: solicitud.telefono || '(01) 410-1010 anexo 2245',
      whatsappConsulta: solicitud.whatsapp || '943 189 536',
      urlRetroalimentacion: solicitud.encuesta || 'https://bit.ly/EncuestaDesempenoPJ',
      brechaMuyBueno,
      brechaBueno,
      numeroWhatsapp: solicitud.telefono_juez || solicitud.whatsapp || '943 189 536'
    };
  }

  async obtenerTodasLasPlantillas(): Promise<any[]> {
    return obtenerTodasLasPlantillas();
  }

  async verificarConexionEvolution(): Promise<any> {
    try {
      const resultado = await this.evolutionApiService.checkInstanceStatus();
      return resultado;
    } catch (error) {
      this.logger.error(`Error verificando conexión Evolution: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Métodos de plantillas ya no necesarios - ahora usamos archivos TS
}
