import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateMaeEstInstanciaDto {
  @IsString()
  c_distrito: string;

  @IsString()
  c_provincia: string;

  @IsString()
  c_instancia: string;

  @IsString()
  x_nom_instancia: string;

  @IsNumber()
  n_instancia: number;

  @IsNumber()
  n_modulo: number;

  @IsString()
  l_modulo_ejecucion: string;

  @IsString()
  x_corto: string;

  @IsString()
  l_ind_baja: string;

  @IsString()
  c_org_jurisd_id: string;

  @IsString()
  c_sede_id: string;

  @IsString()
  @IsOptional()
  b_aud?: string;

  @IsString()
  @IsOptional()
  c_aud_uid?: string;

  @IsString()
  @IsOptional()
  c_aud_uidred?: string;

  @IsString()
  @IsOptional()
  n_aud_ip?: string;

  @IsString()
  @IsOptional()
  c_aud_mcaddr?: string;

  @IsString()
  @IsOptional()
  c_aud_pc?: string;
}

export class UpdateMaeEstInstanciaDto {
  @IsString()
  @IsOptional()
  c_distrito?: string;

  @IsString()
  @IsOptional()
  c_provincia?: string;

  @IsString()
  @IsOptional()
  c_instancia?: string;

  @IsString()
  @IsOptional()
  x_nom_instancia?: string;

  @IsNumber()
  @IsOptional()
  n_instancia?: number;

  @IsNumber()
  @IsOptional()
  n_modulo?: number;

  @IsString()
  @IsOptional()
  l_modulo_ejecucion?: string;

  @IsString()
  @IsOptional()
  x_corto?: string;

  @IsString()
  @IsOptional()
  l_ind_baja?: string;

  @IsString()
  @IsOptional()
  c_org_jurisd_id?: string;

  @IsString()
  @IsOptional()
  c_sede_id?: string;

  @IsString()
  @IsOptional()
  b_aud?: string;

  @IsString()
  @IsOptional()
  c_aud_uid?: string;

  @IsString()
  @IsOptional()
  c_aud_uidred?: string;

  @IsString()
  @IsOptional()
  n_aud_ip?: string;

  @IsString()
  @IsOptional()
  c_aud_mcaddr?: string;

  @IsString()
  @IsOptional()
  c_aud_pc?: string;
}
