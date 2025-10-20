import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaeEstSexos } from '../../conector/entities/mae-est-sexos.entity';
import { CreateMaeEstSexosDto } from '../dto/mae-est-sexos.dto';
import { UpdateMaeEstSexosDto } from '../dto/mae-est-sexos.dto';

@Injectable()
export class MaeEstSexosService {
  constructor(
    @InjectRepository(MaeEstSexos, 'estadisticas')
    private readonly sexosRepository: Repository<MaeEstSexos>,
  ) {}

  async create(createDto: CreateMaeEstSexosDto): Promise<MaeEstSexos> {
    const sexo = this.sexosRepository.create(createDto);
    return await this.sexosRepository.save(sexo);
  }

  async findAll(): Promise<MaeEstSexos[]> {
    return await this.sexosRepository.find();
  }

  async findOne(id: number): Promise<MaeEstSexos | null> {
    return await this.sexosRepository.findOne({ where: { n_id_sexo: id } });
  }

  async update(id: number, updateDto: UpdateMaeEstSexosDto): Promise<MaeEstSexos | null> {
    await this.sexosRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sexosRepository.delete(id);
  }

  async findByDescripcion(descripcion: string): Promise<MaeEstSexos[]> {
    return await this.sexosRepository.find({
      where: { x_descripcion: descripcion }
    });
  }
}
