import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TipoPlantilla } from '../entities/plantilla-whatsapp.entity';

export class EnviarMensajeDto {
  @IsString()
  nombreJuez: string;

  @IsString()
  sexoJuez: string; // 'Dra' o 'Dr'

  @IsString()
  fechaCorte: string;

  @IsNumber()
  metaPreliminar: number;

  @IsString()
  resueltos: string;

  @IsNumber()
  avanceMeta: number;

  @IsString()
  nivelProductivo: string;

  @IsOptional()
  @IsString()
  instancia?: string;

  @IsOptional()
  @IsString()
  numeroConsulta?: string;

  @IsOptional()
  @IsString()
  whatsappConsulta?: string;

  @IsOptional()
  @IsString()
  urlRetroalimentacion?: string;

  @IsOptional()
  @IsNumber()
  brechaMuyBueno?: number;

  @IsOptional()
  @IsNumber()
  brechaBueno?: number;

  @IsString()
  numeroWhatsapp: string; // Número de destino

  @IsOptional()
  @IsEnum(TipoPlantilla)
  tipoPlantilla?: TipoPlantilla;
}
