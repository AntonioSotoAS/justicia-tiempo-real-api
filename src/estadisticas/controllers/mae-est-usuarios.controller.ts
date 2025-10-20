import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaeEstUsuariosService } from '../services/mae-est-usuarios.service';
import { CreateMaeEstUsuariosDto } from '../dto/mae-est-usuarios.dto';
import { UpdateMaeEstUsuariosDto } from '../dto/mae-est-usuarios.dto';

@Controller('usuarios')
export class MaeEstUsuariosController {
  constructor(private readonly usuariosService: MaeEstUsuariosService) {}

  @Post()
  create(@Body() createDto: CreateMaeEstUsuariosDto) {
    return this.usuariosService.create(createDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('activos')
  findActive() {
    return this.usuariosService.findActive();
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usuariosService.findByUsername(username);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usuariosService.findByEmail(email);
  }

  @Get('dni/:dni')
  findByDni(@Param('dni') dni: string) {
    return this.usuariosService.findByDni(dni);
  }

  @Get('sexo/:sexoId')
  findBySexo(@Param('sexoId') sexoId: number) {
    return this.usuariosService.findBySexo(sexoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMaeEstUsuariosDto) {
    return this.usuariosService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }
}
