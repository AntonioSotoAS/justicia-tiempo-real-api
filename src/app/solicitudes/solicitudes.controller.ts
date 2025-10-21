import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  ParseEnumPipe 
} from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { EstadoSolicitud, PrioridadSolicitud } from './entities/solicitud.entity';
import { Auth, AuthWithRoles, CurrentUser, Public } from '../auth/decorators/auth.decorators';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  @Public()
  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudesService.create(createSolicitudDto);
  }

  @Auth()
  @Get()
  findAll(
    @Query('estado') estado?: EstadoSolicitud,
    @Query('prioridad') prioridad?: PrioridadSolicitud,
    @CurrentUser() user?: any
  ) {
    if (estado) {
      return this.solicitudesService.findByEstado(estado);
    }
    if (prioridad) {
      return this.solicitudesService.findByPrioridad(prioridad);
    }
    return this.solicitudesService.findAll();
  }

  @Auth()
  @Get('estadisticas')
  getEstadisticas(@CurrentUser() user: any) {
    return this.solicitudesService.getEstadisticas();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.solicitudesService.findOne(+id);
  }

  @AuthWithRoles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudesService.update(+id, updateSolicitudDto);
  }

  @AuthWithRoles('admin')
  @Patch(':id/estado')
  updateEstado(
    @Param('id') id: string, 
    @Body('estado', new ParseEnumPipe(EstadoSolicitud)) estado: EstadoSolicitud
  ) {
    return this.solicitudesService.updateEstado(+id, estado);
  }

  @AuthWithRoles('admin')
  @Patch(':id/prioridad')
  updatePrioridad(
    @Param('id') id: string, 
    @Body('prioridad', new ParseEnumPipe(PrioridadSolicitud)) prioridad: PrioridadSolicitud
  ) {
    return this.solicitudesService.updatePrioridad(+id, prioridad);
  }

  @AuthWithRoles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudesService.remove(+id);
  }
}
