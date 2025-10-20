import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaeEstInstanciaService } from '../services/mae-est-instancia.service';
import { CreateMaeEstInstanciaDto } from '../dto/mae-est-instancia.dto';
import { UpdateMaeEstInstanciaDto } from '../dto/mae-est-instancia.dto';

@Controller('instancias')
export class MaeEstInstanciaController {
  constructor(private readonly instanciaService: MaeEstInstanciaService) {}

  @Post()
  create(@Body() createDto: CreateMaeEstInstanciaDto) {
    return this.instanciaService.create(createDto);
  }

  @Get()
  findAll() {
    return this.instanciaService.findAll();
  }

  @Get('activas')
  findActive() {
    return this.instanciaService.findActive();
  }

  @Get('distrito/:distrito')
  findByDistrito(@Param('distrito') distrito: string) {
    return this.instanciaService.findByDistrito(distrito);
  }

  @Get('provincia/:provincia')
  findByProvincia(@Param('provincia') provincia: string) {
    return this.instanciaService.findByProvincia(provincia);
  }

  @Get('modulo/:modulo')
  findByModulo(@Param('modulo') modulo: number) {
    return this.instanciaService.findByModulo(modulo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instanciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMaeEstInstanciaDto) {
    return this.instanciaService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instanciaService.remove(+id);
  }
}
