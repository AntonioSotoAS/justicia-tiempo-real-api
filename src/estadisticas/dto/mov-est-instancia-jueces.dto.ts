import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateMovEstInstanciaJuecesDto {
  @IsString()
  x_resolucion: string;

  @IsString()
  x_pdf_res: string;

  @IsDateString()
  f_fecha_creacion: string;

  @IsOptional()
  @IsDateString()
  f_fecha_baja?: string;

  @IsString()
  l_activo: string;

  @IsNumber()
  n_id_juez_id: number;

  @IsNumber()
  n_instancia_id: number;
}

export class UpdateMovEstInstanciaJuecesDto {
  @IsOptional()
  @IsString()
  x_resolucion?: string;

  @IsOptional()
  @IsString()
  x_pdf_res?: string;

  @IsOptional()
  @IsDateString()
  f_fecha_creacion?: string;

  @IsOptional()
  @IsDateString()
  f_fecha_baja?: string;

  @IsOptional()
  @IsString()
  l_activo?: string;

  @IsOptional()
  @IsNumber()
  n_id_juez_id?: number;

  @IsOptional()
  @IsNumber()
  n_instancia_id?: number;
}
