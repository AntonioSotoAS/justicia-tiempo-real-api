import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaeEstMetaResumenesModificado } from '../../conector/entities/mae-est-meta-resumenes-modificado.entity';
import { CreateMaeEstMetaResumenesModificadoDto } from '../dto/mae-est-meta-resumenes-modificado.dto';
import { UpdateMaeEstMetaResumenesModificadoDto } from '../dto/mae-est-meta-resumenes-modificado.dto';

@Injectable()
export class MaeEstMetaResumenesModificadoService {
  constructor(
    @InjectRepository(MaeEstMetaResumenesModificado, 'estadisticas')
    private readonly metaResumenesRepository: Repository<MaeEstMetaResumenesModificado>,
  ) {}

  async create(createDto: CreateMaeEstMetaResumenesModificadoDto): Promise<MaeEstMetaResumenesModificado> {
    const metaResumen = this.metaResumenesRepository.create(createDto);
    return await this.metaResumenesRepository.save(metaResumen);
  }

  async findAll(): Promise<MaeEstMetaResumenesModificado[]> {
    return await this.metaResumenesRepository.find();
  }

  async findOne(id: number): Promise<MaeEstMetaResumenesModificado | null> {
    return await this.metaResumenesRepository.findOne({ where: { n_id_meta_resumen_mod: id } });
  }

  async update(id: number, updateDto: UpdateMaeEstMetaResumenesModificadoDto): Promise<MaeEstMetaResumenesModificado | null> {
    await this.metaResumenesRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.metaResumenesRepository.delete(id);
  }

  async findByAnioAndMes(anio: number, mes: number): Promise<MaeEstMetaResumenesModificado[]> {
    return await this.metaResumenesRepository.find({
      where: { n_anio_est: anio, n_mes_est: mes }
    });
  }

  async findByInstancia(instanciaId: number): Promise<MaeEstMetaResumenesModificado[]> {
    return await this.metaResumenesRepository.find({
      where: { n_instancia_id: instanciaId }
    });
  }
}
