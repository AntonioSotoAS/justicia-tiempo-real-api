import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud, EstadoSolicitud, PrioridadSolicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudWhatsappDto } from '../whatsapp/dto/solicitud-whatsapp.dto';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectRepository(Solicitud)
    private readonly solicitudRepository: Repository<Solicitud>,
  ) {}

  async findAll(): Promise<Solicitud[]> {
    return await this.solicitudRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Solicitud | null> {
    return await this.solicitudRepository.findOne({ where: { id } });
  }

  async create(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    // Convertir nombre_completo a mayúsculas si existe
    if (createSolicitudDto.nombre_completo) {
      createSolicitudDto.nombre_completo = createSolicitudDto.nombre_completo.toUpperCase();
    }
    
    const solicitud = this.solicitudRepository.create(createSolicitudDto);
    return await this.solicitudRepository.save(solicitud);
  }

  async update(id: number, updateSolicitudDto: UpdateSolicitudDto): Promise<Solicitud | null> {
    await this.solicitudRepository.update(id, updateSolicitudDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.solicitudRepository.delete(id);
  }

  async findByEstado(estado: EstadoSolicitud): Promise<Solicitud[]> {
    return await this.solicitudRepository.find({
      where: { estado },
      order: { createdAt: 'DESC' }
    });
  }

  async findByPrioridad(prioridad: PrioridadSolicitud): Promise<Solicitud[]> {
    return await this.solicitudRepository.find({
      where: { prioridad },
      order: { createdAt: 'DESC' }
    });
  }

  async updateEstado(id: number, estado: EstadoSolicitud): Promise<Solicitud | null> {
    await this.solicitudRepository.update(id, { estado });
    return await this.findOne(id);
  }

  async updatePrioridad(id: number, prioridad: PrioridadSolicitud): Promise<Solicitud | null> {
    await this.solicitudRepository.update(id, { prioridad });
    return await this.findOne(id);
  }

  async getEstadisticas() {
    const total = await this.solicitudRepository.count();
    const pendientes = await this.solicitudRepository.count({ where: { estado: EstadoSolicitud.PENDIENTE } });
    const enviadas = await this.solicitudRepository.count({ where: { estado: EstadoSolicitud.ENVIADO } });
    const errores = await this.solicitudRepository.count({ where: { estado: EstadoSolicitud.ERROR } });

    return {
      total,
      pendientes,
      enviadas,
      errores,
      porcentajePendientes: total > 0 ? Math.round((pendientes / total) * 100) : 0,
      porcentajeEnviadas: total > 0 ? Math.round((enviadas / total) * 100) : 0,
      porcentajeErrores: total > 0 ? Math.round((errores / total) * 100) : 0
    };
  }

  async generarDatosWhatsapp(solicitud: Solicitud): Promise<SolicitudWhatsappDto> {
    // Calcular el avance de meta
    const metaPreliminar = solicitud.meta_preliminar || 0;
    const resueltos = solicitud.resoluciones || '0';
    const avanceMeta = solicitud.pct_real_avance || 0;
    console.log('pct_real_avance:', solicitud.pct_real_avance);
    console.log('avanceMeta calculado:', avanceMeta);

    // Usar el nivel productivo de la solicitud
    const nivelProductivo = solicitud.nivel_prod || '';

    // Calcular brechas de producción
    const brechaMuyBueno = solicitud.niv_muy_bueno || 0;
    const brechaBueno = solicitud.niv_bueno || 0;

    console.log('solicitud3434', solicitud);

    return {
      nombreJuez: solicitud.nombre_completo || '',
      sexoJuez: solicitud.sexo === 'Femenino' ? 'Dra' : 'Dr',
      fechaCorte: solicitud.fechaCorte ? 
        (typeof solicitud.fechaCorte === 'string' ? solicitud.fechaCorte : solicitud.fechaCorte.toISOString().split('T')[0]) : 
        new Date().toISOString().split('T')[0],
      metaPreliminar,
      resueltos,
      avanceMeta,
      nivelProductivo,
      instancia: solicitud.instancia || '',
      numeroConsulta: solicitud.telefono || '',
      whatsappConsulta: solicitud.whatsapp || '',
      urlRetroalimentacion: solicitud.encuesta || '',
      brechaMuyBueno,
      brechaBueno,
      numeroWhatsapp: solicitud.telefono_juez || solicitud.whatsapp || ''
    };
  }

}
