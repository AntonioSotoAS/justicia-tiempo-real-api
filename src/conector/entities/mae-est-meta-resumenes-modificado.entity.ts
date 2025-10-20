import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('mae_est_meta_resumenes_modificado')
export class MaeEstMetaResumenesModificado {
  @PrimaryGeneratedColumn()
  n_id_meta_resumen_mod: number;

  @Column({ type: 'int' })
  n_anio_est: number;

  @Column({ type: 'int' })
  n_mes_est: number;

  @Column({ type: 'int' })
  m_estandar_prod: number;

  @Column({ type: 'int' })
  n_carg_procesal_ini: number;

  @Column({ type: 'int' })
  m_t_resuelto: number;

  @Column({ type: 'int' })
  m_t_ingreso: number;

  @Column({ type: 'int' })
  m_t_ingreso_proy: number;

  @Column({ type: 'int' })
  m_ing_proyectado: number;

  @Column({ type: 'int' })
  m_carg_procesal_tram: number;

  @Column({ type: 'int' })
  m_carg_procesal_min: number;

  @Column({ type: 'int' })
  m_carg_procesal_max: number;

  @Column({ type: 'int' })
  m_egre_otra_dep: number;

  @Column({ type: 'int' })
  m_ing_otra_dep: number;

  @Column({ type: 'int' })
  m_pend_reserva: number;

  @Column({ type: 'int' })
  m_meta_preliminar: number;

  @Column({ type: 'varchar', length: 20 })
  x_situacion_carga: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  m_avan_meta: number;

  @Column({ type: 'int' })
  m_ideal_avan_meta: number;

  @Column({ type: 'int' })
  m_ideal_avan_meta_ant: number;

  @Column({ type: 'varchar', length: 20 })
  x_niv_produc: string;

  @Column({ type: 'int' })
  m_niv_bueno: number;

  @Column({ type: 'int' })
  m_niv_muy_bueno: number;

  @Column({ type: 'datetime', precision: 6 })
  f_fecha_mod: Date;

  @Column({ type: 'varchar', length: 1 })
  l_estado: string;

  @Column({ type: 'tinyint', width: 1 })
  m_op_egre_otra_dep: boolean;

  @Column({ type: 'tinyint', width: 1 })
  m_op_ing_otra_dep: boolean;

  @Column({ type: 'tinyint', width: 1 })
  m_op_pend_reserva: boolean;

  @Column({ type: 'int' })
  n_valor_modificado: number;

  @Column({ type: 'int' })
  n_meta_opj: number;

  @Column({ type: 'varchar', length: 1 })
  l_corte: string;

  @Column({ type: 'int' })
  n_instancia_id: number;

  @Column({ type: 'int' })
  n_id_modulo_id: number;

  // Campos de auditoría
  @CreateDateColumn({ type: 'datetime', precision: 6 })
  f_aud: Date;

  @Column({ type: 'varchar', length: 1 })
  b_aud: string;

  @Column({ type: 'varchar', length: 30 })
  c_aud_uid: string;

  @Column({ type: 'varchar', length: 30 })
  c_aud_uidred: string;

  @Column({ type: 'char', length: 39 })
  n_aud_ip: string;

  @Column({ type: 'varchar', length: 17 })
  c_aud_mcaddr: string;

  @Column({ type: 'varchar', length: 30 })
  c_aud_pc: string;
}
