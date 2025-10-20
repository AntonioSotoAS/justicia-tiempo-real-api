import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaeEstJuecesService } from '../services/mae-est-jueces.service';
import { CreateMaeEstJuecesDto } from '../dto/mae-est-jueces.dto';
import { UpdateMaeEstJuecesDto } from '../dto/mae-est-jueces.dto';

@Controller('jueces')
export class MaeEstJuecesController {
  constructor(private readonly juecesService: MaeEstJuecesService) {}

  @Post()
  create(@Body() createDto: CreateMaeEstJuecesDto) {
    return this.juecesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.juecesService.findAll();
  }

  @Get('activos')
  findActive() {
    return this.juecesService.findActive();
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.juecesService.findByUsuario(parseInt(usuarioId));
  }

  @Get('tipo/:tipoId')
  findByTipo(@Param('tipoId') tipoId: number) {
    return this.juecesService.findByTipo(tipoId);
  }

  @Get('meta-resumenes')
  findJuecesWithMetaResumenes() {
    return this.juecesService.findJuecesWithMetaResumenes();
  }


  @Get(':id/meta-resumenes')
  findJuezWithMetaResumenes(@Param('id') id: string) {
    return this.juecesService.findJuezWithMetaResumenes(+id);
  }


  @Get('completos')
  findJuecesCompletos() {
    return this.juecesService.findJuecesCompletos();
  }


  @Get('meta-resumen/:anio/:mes/:instanciaId')
  findMetaResumenByInstancia(
    @Param('anio') anio: string,
    @Param('mes') mes: string,
    @Param('instanciaId') instanciaId: string
  ) {
    return this.juecesService.findMetaResumenByInstancia(
      parseInt(anio),
      parseInt(mes),
      parseInt(instanciaId)
    );
  }


  @Get('con-meta-resumenes/:anio/:mes')
  findJuecesWithMetaResumenesActuales(
    @Param('anio') anio: string,
    @Param('mes') mes: string
  ) {
    return this.juecesService.findJuecesWithMetaResumenesActuales(
      parseInt(anio),
      parseInt(mes)
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juecesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMaeEstJuecesDto) {
    return this.juecesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juecesService.remove(+id);
  }
}
