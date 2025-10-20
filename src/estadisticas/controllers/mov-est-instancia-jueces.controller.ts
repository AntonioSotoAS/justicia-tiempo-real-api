import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MovEstInstanciaJuecesService } from '../services/mov-est-instancia-jueces.service';
import { CreateMovEstInstanciaJuecesDto } from '../dto/mov-est-instancia-jueces.dto';
import { UpdateMovEstInstanciaJuecesDto } from '../dto/mov-est-instancia-jueces.dto';

@Controller('instancia-jueces')
export class MovEstInstanciaJuecesController {
  constructor(private readonly instanciaJuecesService: MovEstInstanciaJuecesService) {}

  @Post()
  create(@Body() createDto: CreateMovEstInstanciaJuecesDto) {
    return this.instanciaJuecesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.instanciaJuecesService.findAll();
  }

  @Get('activos')
  findActive() {
    return this.instanciaJuecesService.findActive();
  }

  @Get('juez/:juezId')
  findByJuez(@Param('juezId') juezId: number) {
    return this.instanciaJuecesService.findByJuez(juezId);
  }

  @Get('instancia/:instanciaId')
  findByInstancia(@Param('instanciaId') instanciaId: number) {
    return this.instanciaJuecesService.findByInstancia(instanciaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instanciaJuecesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMovEstInstanciaJuecesDto) {
    return this.instanciaJuecesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instanciaJuecesService.remove(+id);
  }
}
