import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaeEstInstancia } from '../../conector/entities/mae-est-instancia.entity';
import { CreateMaeEstInstanciaDto } from '../dto/mae-est-instancia.dto';
import { UpdateMaeEstInstanciaDto } from '../dto/mae-est-instancia.dto';

@Injectable()
export class MaeEstInstanciaService {
  constructor(
    @InjectRepository(MaeEstInstancia)
    private readonly instanciaRepository: Repository<MaeEstInstancia>,
  ) {}

  async create(createDto: CreateMaeEstInstanciaDto): Promise<MaeEstInstancia> {
    const instancia = this.instanciaRepository.create(createDto);
    return await this.instanciaRepository.save(instancia);
  }

  async findAll(): Promise<MaeEstInstancia[]> {
    return await this.instanciaRepository.find();
  }

  async findOne(id: number): Promise<MaeEstInstancia | null> {
    return await this.instanciaRepository.findOne({ where: { n_instancia_id: id } });
  }

  async update(id: number, updateDto: UpdateMaeEstInstanciaDto): Promise<MaeEstInstancia | null> {
    await this.instanciaRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.instanciaRepository.delete(id);
  }

  async findActive(): Promise<MaeEstInstancia[]> {
    return await this.instanciaRepository.find({
      where: { l_ind_baja: 'N' }
    });
  }

  async findByDistrito(distrito: string): Promise<MaeEstInstancia[]> {
    return await this.instanciaRepository.find({
      where: { c_distrito: distrito }
    });
  }

  async findByProvincia(provincia: string): Promise<MaeEstInstancia[]> {
    return await this.instanciaRepository.find({
      where: { c_provincia: provincia }
    });
  }

  async findByModulo(modulo: number): Promise<MaeEstInstancia[]> {
    return await this.instanciaRepository.find({
      where: { n_modulo: modulo }
    });
  }
}
