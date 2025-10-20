import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaeEstJuezTiposService } from '../services/mae-est-juez-tipos.service';
import { CreateMaeEstJuezTiposDto } from '../dto/mae-est-juez-tipos.dto';
import { UpdateMaeEstJuezTiposDto } from '../dto/mae-est-juez-tipos.dto';

@Controller('juez-tipos')
export class MaeEstJuezTiposController {
  constructor(private readonly juezTiposService: MaeEstJuezTiposService) {}

  @Post()
  create(@Body() createDto: CreateMaeEstJuezTiposDto) {
    return this.juezTiposService.create(createDto);
  }

  @Get()
  findAll() {
    return this.juezTiposService.findAll();
  }

  @Get('buscar')
  findByDescripcion(@Query('descripcion') descripcion: string) {
    return this.juezTiposService.findByDescripcion(descripcion);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juezTiposService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMaeEstJuezTiposDto) {
    return this.juezTiposService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juezTiposService.remove(+id);
  }
}
