import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaeEstMetaResumenesModificadoService } from '../services/mae-est-meta-resumenes-modificado.service';
import { CreateMaeEstMetaResumenesModificadoDto } from '../dto/mae-est-meta-resumenes-modificado.dto';
import { UpdateMaeEstMetaResumenesModificadoDto } from '../dto/mae-est-meta-resumenes-modificado.dto';

@Controller('meta-resumenes')
export class MaeEstMetaResumenesModificadoController {
  constructor(private readonly metaResumenesService: MaeEstMetaResumenesModificadoService) {}

  @Post()
  create(@Body() createDto: CreateMaeEstMetaResumenesModificadoDto) {
    return this.metaResumenesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.metaResumenesService.findAll();
  }

  @Get('anio-mes')
  findByAnioAndMes(@Query('anio') anio: number, @Query('mes') mes: number) {
    return this.metaResumenesService.findByAnioAndMes(anio, mes);
  }

  @Get('instancia/:instanciaId')
  findByInstancia(@Param('instanciaId') instanciaId: number) {
    return this.metaResumenesService.findByInstancia(instanciaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metaResumenesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMaeEstMetaResumenesModificadoDto) {
    return this.metaResumenesService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metaResumenesService.remove(+id);
  }
}
