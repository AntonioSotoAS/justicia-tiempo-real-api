import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ColaProcesamientoService } from './cola-procesamiento.service';

@Injectable()
export class CronSchedulerService {
  private readonly logger = new Logger(CronSchedulerService.name);

  constructor(
    private readonly colaProcesamientoService: ColaProcesamientoService,
  ) {}

  /**
   * Cron job que se ejecuta cada 5 minutos
   * Puedes cambiar el intervalo modificando CronExpression.EVERY_5_MINUTES
   * 
   * Opciones disponibles:
   * - CronExpression.EVERY_MINUTE (cada minuto)
   * - CronExpression.EVERY_5_MINUTES (cada 5 minutos)
   * - CronExpression.EVERY_10_MINUTES (cada 10 minutos)
   * - CronExpression.EVERY_30_MINUTES (cada 30 minutos)
   * - CronExpression.EVERY_HOUR (cada hora)
   * - CronExpression.EVERY_2_HOURS (cada 2 horas)
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async procesarColaSolicitudes() {
    this.logger.log('Ejecutando cron job de procesamiento de cola...');
    
    try {
      await this.colaProcesamientoService.procesarCola();
    } catch (error) {
      this.logger.error(`Error en cron job: ${error.message}`);
    }
  }

  /**
   * Cron job que se ejecuta cada hora para mostrar estadísticas
   */
  @Cron(CronExpression.EVERY_HOUR)
  async mostrarEstadisticasCola() {
    try {
      const stats = await this.colaProcesamientoService.obtenerEstadisticasCola();
      this.logger.log(`Estadísticas de cola - Pendientes: ${stats.pendientes}, Enviando: ${stats.enviando}, Procesando: ${stats.procesando}`);
    } catch (error) {
      this.logger.error(`Error obteniendo estadísticas: ${error.message}`);
    }
  }

  /**
   * Método para procesar manualmente la cola (útil para testing)
   */
  async procesarColaManual(): Promise<void> {
    this.logger.log('Procesamiento manual de cola iniciado...');
    await this.colaProcesamientoService.procesarCola();
  }

  /**
   * Obtener estadísticas de la cola
   */
  async obtenerEstadisticas() {
    return await this.colaProcesamientoService.obtenerEstadisticasCola();
  }
}
