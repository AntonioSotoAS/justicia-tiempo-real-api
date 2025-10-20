import { IsOptional, IsNumber, IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateMaeEstMetaResumenesModificadoDto {
  @IsNumber()
  n_anio_est: number;

  @IsNumber()
  n_mes_est: number;

  @IsNumber()
  m_estandar_prod: number;

  @IsNumber()
  n_carg_procesal_ini: number;

  @IsNumber()
  m_t_resuelto: number;

  @IsNumber()
  m_t_ingreso: number;

  @IsNumber()
  m_t_ingreso_proy: number;

  @IsNumber()
  m_ing_proyectado: number;

  @IsNumber()
  m_carg_procesal_tram: number;

  @IsNumber()
  m_carg_procesal_min: number;

  @IsNumber()
  m_carg_procesal_max: number;

  @IsNumber()
  m_egre_otra_dep: number;

  @IsNumber()
  m_ing_otra_dep: number;

  @IsNumber()
  m_pend_reserva: number;

  @IsNumber()
  m_meta_preliminar: number;

  @IsString()
  x_situacion_carga: string;

  @IsNumber()
  m_avan_meta: number;

  @IsNumber()
  m_ideal_avan_meta: number;

  @IsNumber()
  m_ideal_avan_meta_ant: number;

  @IsString()
  x_niv_produc: string;

  @IsNumber()
  m_niv_bueno: number;

  @IsNumber()
  m_niv_muy_bueno: number;

  @IsDateString()
  f_fecha_mod: string;

  @IsString()
  l_estado: string;

  @IsBoolean()
  m_op_egre_otra_dep: boolean;

  @IsBoolean()
  m_op_ing_otra_dep: boolean;

  @IsBoolean()
  m_op_pend_reserva: boolean;

  @IsNumber()
  n_valor_modificado: number;

  @IsNumber()
  n_meta_opj: number;

  @IsString()
  l_corte: string;

  @IsNumber()
  n_instancia_id: number;

  @IsNumber()
  n_id_modulo_id: number;
}

export class UpdateMaeEstMetaResumenesModificadoDto {
  @IsOptional()
  @IsNumber()
  n_anio_est?: number;

  @IsOptional()
  @IsNumber()
  n_mes_est?: number;

  @IsOptional()
  @IsNumber()
  m_estandar_prod?: number;

  @IsOptional()
  @IsNumber()
  n_carg_procesal_ini?: number;

  @IsOptional()
  @IsNumber()
  m_t_resuelto?: number;

  @IsOptional()
  @IsNumber()
  m_t_ingreso?: number;

  @IsOptional()
  @IsNumber()
  m_t_ingreso_proy?: number;

  @IsOptional()
  @IsNumber()
  m_ing_proyectado?: number;

  @IsOptional()
  @IsNumber()
  m_carg_procesal_tram?: number;

  @IsOptional()
  @IsNumber()
  m_carg_procesal_min?: number;

  @IsOptional()
  @IsNumber()
  m_carg_procesal_max?: number;

  @IsOptional()
  @IsNumber()
  m_egre_otra_dep?: number;

  @IsOptional()
  @IsNumber()
  m_ing_otra_dep?: number;

  @IsOptional()
  @IsNumber()
  m_pend_reserva?: number;

  @IsOptional()
  @IsNumber()
  m_meta_preliminar?: number;

  @IsOptional()
  @IsString()
  x_situacion_carga?: string;

  @IsOptional()
  @IsNumber()
  m_avan_meta?: number;

  @IsOptional()
  @IsNumber()
  m_ideal_avan_meta?: number;

  @IsOptional()
  @IsNumber()
  m_ideal_avan_meta_ant?: number;

  @IsOptional()
  @IsString()
  x_niv_produc?: string;

  @IsOptional()
  @IsNumber()
  m_niv_bueno?: number;

  @IsOptional()
  @IsNumber()
  m_niv_muy_bueno?: number;

  @IsOptional()
  @IsDateString()
  f_fecha_mod?: string;

  @IsOptional()
  @IsString()
  l_estado?: string;

  @IsOptional()
  @IsBoolean()
  m_op_egre_otra_dep?: boolean;

  @IsOptional()
  @IsBoolean()
  m_op_ing_otra_dep?: boolean;

  @IsOptional()
  @IsBoolean()
  m_op_pend_reserva?: boolean;

  @IsOptional()
  @IsNumber()
  n_valor_modificado?: number;

  @IsOptional()
  @IsNumber()
  n_meta_opj?: number;

  @IsOptional()
  @IsString()
  l_corte?: string;

  @IsOptional()
  @IsNumber()
  n_instancia_id?: number;

  @IsOptional()
  @IsNumber()
  n_id_modulo_id?: number;
}
