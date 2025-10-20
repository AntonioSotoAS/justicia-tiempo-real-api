export class JuezMetaResumenDto {
  // Datos del juez
  n_id_juez: number;
  usuario_id: number;
  n_id_juez_tipo_id: number;
  l_activo: string;

  // Información del usuario (nombre, apellido, sexo)
  x_nombres?: string;
  x_app_paterno?: string;
  x_app_materno?: string;
  x_dni?: string;
  x_telefono?: string;
  email?: string;
  username?: string;
  n_id_sexo_id?: number;
  x_sexo_descripcion?: string;

  // Información del tipo de juez
  x_juez_tipo_descripcion?: string;

  // Datos de la meta resumen
  n_id_meta_resumen_mod?: number;
  n_anio_est?: number;
  n_mes_est?: number;
  m_estandar_prod?: number;
  n_carg_procesal_ini?: number;
  m_t_resuelto?: number;
  m_t_ingreso?: number;
  m_t_ingreso_proy?: number;
  m_ing_proyectado?: number;
  m_carg_procesal_tram?: number;
  m_carg_procesal_min?: number;
  m_carg_procesal_max?: number;
  m_egre_otra_dep?: number;
  m_ing_otra_dep?: number;
  m_pend_reserva?: number;
  m_meta_preliminar?: number;
  x_situacion_carga?: string;
  m_avan_meta?: number;
  m_ideal_avan_meta?: number;
  m_ideal_avan_meta_ant?: number;
  x_niv_produc?: string;
  m_niv_bueno?: number;
  m_niv_muy_bueno?: number;
  f_fecha_mod?: Date;
  l_estado?: string;
  m_op_egre_otra_dep?: boolean;
  m_op_ing_otra_dep?: boolean;
  m_op_pend_reserva?: boolean;
  n_valor_modificado?: number;
  n_meta_opj?: number;
  l_corte?: string;
  n_instancia_id?: number;
  n_id_modulo_id?: number;
}
