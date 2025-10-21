import { Controller, Get, Query, Logger } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';

@Controller('estadistica')
export class EstadisticaController {
  private readonly logger = new Logger(EstadisticaController.name);

  constructor(private readonly estadisticaService: EstadisticaService) {}

  /**
   * Obtiene datos del cuadro anual de metas
   * GET /estadistica/cuadro-anual
   * Query params opcionales: year, month
   */
  @Get('cuadro-anual')
  async getCuadroAnual(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    this.logger.log(`Solicitud de cuadro anual - Año: ${year || 'actual'}, Mes: ${month || 'actual'}`);
    
    const yearNum = year ? parseInt(year, 10) : undefined;
    const monthNum = month ? parseInt(month, 10) : undefined;
    
    return this.estadisticaService.getCuadroAnual(yearNum, monthNum);
  }

  /**
   * Obtiene datos del cuadro anual para el año y mes actual
   * GET /estadistica/cuadro-anual/actual
   */
  @Get('cuadro-anual/actual')
  async getCuadroAnualActual() {
    this.logger.log('Solicitud de cuadro anual actual');
    return this.estadisticaService.getCuadroAnualActual();
  }

  /**
   * Obtiene datos del cuadro anual para un año específico
   * GET /estadistica/cuadro-anual/:year
   */
  @Get('cuadro-anual/:year')
  async getCuadroAnualPorAnio(@Query('year') year: string) {
    this.logger.log(`Solicitud de cuadro anual para año: ${year}`);
    const yearNum = parseInt(year, 10);
    return this.estadisticaService.getCuadroAnualPorAnio(yearNum);
  }

  /**
   * Obtiene la lista de jueces con toda su información
   * GET /estadistica/jueces
   * Query params opcionales: year, month
   */
  @Get('jueces')
  async getJueces(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    this.logger.log(`Solicitud de jueces - Año: ${year || 'actual'}, Mes: ${month || 'actual'}`);
    
    const yearNum = year ? parseInt(year, 10) : undefined;
    const monthNum = month ? parseInt(month, 10) : undefined;
    
    return this.estadisticaService.getJueces(yearNum, monthNum);
  }
}
