import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CuadroAnualDto, JuezObjetoDto } from './dto/cuadro-anual.dto';

@Injectable()
export class EstadisticaService {
  private readonly logger = new Logger(EstadisticaService.name);
  private readonly apiBaseUrl = 'http://localhost:8000/est/metas/cuadro-anual/api/';
  private readonly username = 'lmancov';
  private readonly password = 'admin';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Obtiene datos del cuadro anual de metas
   * @param year Año (opcional, por defecto año actual)
   * @param month Mes (opcional, por defecto mes actual)
   */
  async getCuadroAnual(year?: number, month?: number): Promise<CuadroAnualDto> {
    try {
      this.logger.log(`Obteniendo datos del cuadro anual - Año: ${year || 'actual'}, Mes: ${month || 'actual'}`);
      
      // Construir URL con parámetros opcionales
      let url = this.apiBaseUrl;
      const params = new URLSearchParams();
      
      if (year) params.append('year', year.toString());
      if (month) params.append('month', month.toString());
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      // Configurar headers para Basic Auth
      const credentials = Buffer.from(`${this.username}:${this.password}`).toString('base64');
      
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
        })
      );

      this.logger.log('Datos obtenidos exitosamente del API externo');
      return response.data as CuadroAnualDto;
    } catch (error) {
      this.logger.error('Error al obtener datos del API externo:', error.message);
      throw new Error(`Error al conectar con el API de estadísticas: ${error.message}`);
    }
  }

  /**
   * Obtiene datos del cuadro anual para el año y mes actual
   */
  async getCuadroAnualActual(): Promise<CuadroAnualDto> {
    const now = new Date();
    return this.getCuadroAnual(now.getFullYear(), now.getMonth() + 1);
  }

  /**
   * Obtiene datos del cuadro anual para un año específico
   */
  async getCuadroAnualPorAnio(year: number): Promise<CuadroAnualDto> {
    return this.getCuadroAnual(year);
  }

  /**
   * Obtiene datos del cuadro anual para un año y mes específico
   */
  async getCuadroAnualPorAnioYMes(year: number, month: number): Promise<CuadroAnualDto> {
    return this.getCuadroAnual(year, month);
  }

  /**
   * Obtiene todos los jueces del cuadro anual
   * @param year Año (opcional, por defecto año actual)
   * @param month Mes (opcional, por defecto mes actual)
   * @returns Array de jueces con toda su información
   */
  async getJueces(year?: number, month?: number): Promise<JuezObjetoDto[]> {
    try {
      const cuadroAnual = await this.getCuadroAnual(year, month);
      
      // Obtener todos los jueces de todas las filas
      const todosLosJueces: JuezObjetoDto[] = [];
      
      cuadroAnual.filas.forEach(fila => {
        if (fila.jueces_objetos && fila.jueces_objetos.length > 0) {
          todosLosJueces.push(...fila.jueces_objetos);
        }
      });

      // Eliminar duplicados basándose en el nombre completo
      const juecesUnicos = todosLosJueces.filter((juez, index, array) => 
        array.findIndex(j => j.nombre_completo === juez.nombre_completo) === index
      );

      this.logger.log(`Se encontraron ${juecesUnicos.length} jueces únicos`);
      return juecesUnicos;
    } catch (error) {
      this.logger.error('Error al obtener jueces:', error.message);
      throw new Error(`Error al obtener jueces: ${error.message}`);
    }
  }
}
