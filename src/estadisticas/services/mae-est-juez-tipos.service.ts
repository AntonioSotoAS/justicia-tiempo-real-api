import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaeEstJuezTipos } from '../../conector/entities/mae-est-juez-tipos.entity';
import { CreateMaeEstJuezTiposDto } from '../dto/mae-est-juez-tipos.dto';
import { UpdateMaeEstJuezTiposDto } from '../dto/mae-est-juez-tipos.dto';

@Injectable()
export class MaeEstJuezTiposService {
  constructor(
    @InjectRepository(MaeEstJuezTipos)
    private readonly juezTiposRepository: Repository<MaeEstJuezTipos>,
  ) {}

  async create(createDto: CreateMaeEstJuezTiposDto): Promise<MaeEstJuezTipos> {
    const juezTipo = this.juezTiposRepository.create(createDto);
    return await this.juezTiposRepository.save(juezTipo);
  }

  async findAll(): Promise<MaeEstJuezTipos[]> {
    return await this.juezTiposRepository.find();
  }

  async findOne(id: number): Promise<MaeEstJuezTipos | null> {
    return await this.juezTiposRepository.findOne({ where: { n_id_juez_tipo: id } });
  }

  async update(id: number, updateDto: UpdateMaeEstJuezTiposDto): Promise<MaeEstJuezTipos | null> {
    await this.juezTiposRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.juezTiposRepository.delete(id);
  }

  async findByDescripcion(descripcion: string): Promise<MaeEstJuezTipos[]> {
    return await this.juezTiposRepository.find({
      where: { x_descripcion: descripcion }
    });
  }
}
