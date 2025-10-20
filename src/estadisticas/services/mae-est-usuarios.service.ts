import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaeEstUsuarios } from '../../conector/entities/mae-est-usuarios.entity';
import { CreateMaeEstUsuariosDto } from '../dto/mae-est-usuarios.dto';
import { UpdateMaeEstUsuariosDto } from '../dto/mae-est-usuarios.dto';

@Injectable()
export class MaeEstUsuariosService {
  constructor(
    @InjectRepository(MaeEstUsuarios)
    private readonly usuariosRepository: Repository<MaeEstUsuarios>,
  ) {}

  async create(createDto: CreateMaeEstUsuariosDto): Promise<MaeEstUsuarios> {
    const usuario = this.usuariosRepository.create(createDto);
    return await this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<MaeEstUsuarios[]> {
    return await this.usuariosRepository.find();
  }

  async findOne(id: number): Promise<MaeEstUsuarios | null> {
    return await this.usuariosRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateDto: UpdateMaeEstUsuariosDto): Promise<MaeEstUsuarios | null> {
    await this.usuariosRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }

  async findByUsername(username: string): Promise<MaeEstUsuarios | null> {
    return await this.usuariosRepository.findOne({
      where: { username: username }
    });
  }

  async findByEmail(email: string): Promise<MaeEstUsuarios | null> {
    return await this.usuariosRepository.findOne({
      where: { email: email }
    });
  }

  async findByDni(dni: string): Promise<MaeEstUsuarios | null> {
    return await this.usuariosRepository.findOne({
      where: { x_dni: dni }
    });
  }

  async findActive(): Promise<MaeEstUsuarios[]> {
    return await this.usuariosRepository.find({
      where: { is_active: true }
    });
  }

  async findBySexo(sexoId: number): Promise<MaeEstUsuarios[]> {
    return await this.usuariosRepository.find({
      where: { n_id_sexo_id: sexoId }
    });
  }
}
