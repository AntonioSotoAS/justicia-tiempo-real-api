import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovEstInstanciaJueces } from '../../conector/entities/mov-est-instancia-jueces.entity';
import { CreateMovEstInstanciaJuecesDto } from '../dto/mov-est-instancia-jueces.dto';
import { UpdateMovEstInstanciaJuecesDto } from '../dto/mov-est-instancia-jueces.dto';

@Injectable()
export class MovEstInstanciaJuecesService {
  constructor(
    @InjectRepository(MovEstInstanciaJueces)
    private readonly instanciaJuecesRepository: Repository<MovEstInstanciaJueces>,
  ) {}

  async create(createDto: CreateMovEstInstanciaJuecesDto): Promise<MovEstInstanciaJueces> {
    const instanciaJuez = this.instanciaJuecesRepository.create(createDto);
    return await this.instanciaJuecesRepository.save(instanciaJuez);
  }

  async findAll(): Promise<MovEstInstanciaJueces[]> {
    return await this.instanciaJuecesRepository.find();
  }

  async findOne(id: number): Promise<MovEstInstanciaJueces | null> {
    return await this.instanciaJuecesRepository.findOne({ where: { n_id_instancia_juez: id } });
  }

  async update(id: number, updateDto: UpdateMovEstInstanciaJuecesDto): Promise<MovEstInstanciaJueces | null> {
    await this.instanciaJuecesRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.instanciaJuecesRepository.delete(id);
  }

  async findByJuez(juezId: number): Promise<MovEstInstanciaJueces[]> {
    return await this.instanciaJuecesRepository.find({
      where: { n_id_juez_id: juezId }
    });
  }

  async findByInstancia(instanciaId: number): Promise<MovEstInstanciaJueces[]> {
    return await this.instanciaJuecesRepository.find({
      where: { n_instancia_id: instanciaId }
    });
  }

  async findActive(): Promise<MovEstInstanciaJueces[]> {
    return await this.instanciaJuecesRepository.find({
      where: { l_activo: '1' }
    });
  }
}
