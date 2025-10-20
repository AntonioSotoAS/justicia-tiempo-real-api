import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MaeEstSexosService } from '../services/mae-est-sexos.service';
import { CreateMaeEstSexosDto } from '../dto/mae-est-sexos.dto';
import { UpdateMaeEstSexosDto } from '../dto/mae-est-sexos.dto';

@Controller('sexos')
export class MaeEstSexosController {
  constructor(private readonly sexosService: MaeEstSexosService) {}

  @Post()
  create(@Body() createDto: CreateMaeEstSexosDto) {
    return this.sexosService.create(createDto);
  }

  @Get()
  findAll() {
    return this.sexosService.findAll();
  }

  @Get('buscar')
  findByDescripcion(@Query('descripcion') descripcion: string) {
    return this.sexosService.findByDescripcion(descripcion);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sexosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMaeEstSexosDto) {
    return this.sexosService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sexosService.remove(+id);
  }
}
