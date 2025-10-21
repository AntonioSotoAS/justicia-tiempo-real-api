import { IsOptional, IsString, IsEnum, IsDateString } from 'class-validator';
import { EstadoSolicitud, PrioridadSolicitud } from '../entities/solicitud.entity';

export class CreateSolicitudDto {
  @IsOptional()
  @IsString()
  mMetaPreliminar?: string;

  @IsOptional()
  @IsString()
  mTResueltos?: string;

  @IsOptional()
  @IsString()
  mAvanMeta?: string;

  @IsOptional()
  @IsString()
  NivProduc?: string;

  @IsOptional()
  @IsString()
  encuesta_retroalimentacion?: string;

  @IsOptional()
  @IsString()
  numero_consulta?: string;

  @IsOptional()
  @IsString()
  anexo_consulta?: string;

  @IsOptional()
  @IsString()
  whatsapp_consulta?: string;

  @IsOptional()
  @IsString()
  numerojuez?: string;

  @IsOptional()
  @IsString()
  nombresapellidsojuez?: string;

  @IsOptional()
  @IsString()
  instaciajuez?: string;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsString()
  hora?: string;

  @IsOptional()
  @IsEnum(EstadoSolicitud)
  estado?: EstadoSolicitud;

  @IsOptional()
  @IsEnum(PrioridadSolicitud)
  prioridad?: PrioridadSolicitud;
}
