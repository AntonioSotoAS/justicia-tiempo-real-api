import { IsOptional, IsString, IsEnum, IsDateString, IsNumber, IsBoolean } from 'class-validator';
import { EstadoSolicitud, PrioridadSolicitud } from '../entities/solicitud.entity';

export class CreateSolicitudDto {
  // Campos del mensaje
  @IsOptional()
  @IsString()
  encuesta?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsDateString()
  fechaEnvio?: string;

  @IsOptional()
  @IsString()
  horaEnvio?: string;

  @IsOptional()
  @IsDateString()
  fechaCorte?: string;

  // Campos de jueces
  @IsOptional()
  @IsString()
  instancia?: string;

  @IsOptional()
  @IsString()
  modulo_nom?: string;

  @IsOptional()
  @IsNumber()
  meta_preliminar?: number;

  @IsOptional()
  @IsString()
  nivel_prod?: string;

  @IsOptional()
  @IsNumber()
  pct_real_avance?: number;

  @IsOptional()
  @IsNumber()
  niv_bueno?: number;

  @IsOptional()
  @IsNumber()
  niv_muy_bueno?: number;

  @IsOptional()
  @IsString()
  resoluciones?: string;

  // Campos del juez
  @IsOptional()
  @IsString()
  nombre_completo?: string;

  @IsOptional()
  @IsString()
  telefono_juez?: string;

  @IsOptional()
  @IsBoolean()
  l_mensaje?: boolean;

  @IsOptional()
  @IsString()
  sexo?: string;

  @IsOptional()
  @IsEnum(EstadoSolicitud)
  estado?: EstadoSolicitud;

  @IsOptional()
  @IsEnum(PrioridadSolicitud)
  prioridad?: PrioridadSolicitud;
}
