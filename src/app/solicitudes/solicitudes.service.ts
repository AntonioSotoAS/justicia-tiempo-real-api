import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitud, EstadoSolicitud, PrioridadSolicitud } from './entities/solicitud.entity';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';

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
}
