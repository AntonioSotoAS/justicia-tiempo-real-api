import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { EnviarMensajeDto } from './dto/enviar-mensaje.dto';
import { TipoPlantilla } from './entities/plantilla-whatsapp.entity';

@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('enviar-mensaje')
  async enviarMensaje(@Body() datos: EnviarMensajeDto) {
    try {
      const resultado = await this.whatsappService.enviarMensaje(datos);
      
      // Aquí se integraría con la API de WhatsApp
      // Por ahora solo retornamos el mensaje procesado
      return {
        success: true,
        mensaje: resultado.mensaje,
        numeroDestino: resultado.numeroDestino,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error al enviar mensaje: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('plantillas')
  async obtenerPlantillas() {
    try {
      const plantillas = await this.whatsappService.obtenerTodasLasPlantillas();
      return {
        success: true,
        plantillas
      };
    } catch (error) {
      throw new HttpException(
        `Error al obtener plantillas: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('plantilla/:tipo')
  async obtenerPlantilla(@Param('tipo') tipo: TipoPlantilla) {
    try {
      const plantilla = await this.whatsappService.obtenerPlantilla(tipo);
      return {
        success: true,
        plantilla
      };
    } catch (error) {
      throw new HttpException(
        `Error al obtener plantilla: ${error.message}`,
        HttpStatus.NOT_FOUND
      );
    }
  }

  // Las plantillas ahora están hardcodeadas en archivos TS - no necesitan inicialización

  @Post('previsualizar-mensaje')
  async previsualizarMensaje(@Body() datos: EnviarMensajeDto) {
    try {
      const resultado = await this.whatsappService.enviarMensaje(datos);
      
      return {
        success: true,
        mensaje: resultado.mensaje,
        numeroDestino: resultado.numeroDestino,
        tipoPlantilla: datos.tipoPlantilla || this.whatsappService.determinarTipoPlantilla(datos.nivelProductivo)
      };
    } catch (error) {
      throw new HttpException(
        `Error al previsualizar mensaje: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('enviar-prueba')
  async enviarMensajePrueba(@Body() datos: EnviarMensajeDto) {
    try {
      // Enviar mensaje real via Evolution API
      const resultado = await this.whatsappService.enviarMensajeConEvolution(999, datos);
      
      return {
        success: resultado.success,
        mensaje: resultado.success ? 'Mensaje enviado exitosamente' : 'Error al enviar mensaje',
        messageId: resultado.messageId,
        error: resultado.error,
        numeroDestino: datos.numeroWhatsapp,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error al enviar mensaje de prueba: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('test-simple')
  async testMensajeSimple(@Body() body: { numero: string; mensaje: string }) {
    try {
      const datos: EnviarMensajeDto = {
        nombreJuez: 'Juez de Prueba',
        sexoJuez: 'Dra',
        fechaCorte: new Date().toISOString().split('T')[0],
        metaPreliminar: 0,
        resueltos: '',
        avanceMeta: 0,
        nivelProductivo: 'MUY BUENO',
        numeroWhatsapp: body.numero,
        brechaMuyBueno: 0,
        brechaBueno: 0
      };

      const resultado = await this.whatsappService.enviarMensajeConEvolution(999, datos);
      
      return {
        success: resultado.success,
        mensaje: resultado.success ? 'Mensaje de prueba enviado' : 'Error al enviar',
        messageId: resultado.messageId,
        error: resultado.error,
        numeroDestino: body.numero
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  @Get('verificar-evolution')
  async verificarEvolution() {
    try {
      const resultado = await this.whatsappService.verificarConexionEvolution();
      return {
        success: true,
        conexion: resultado
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}
