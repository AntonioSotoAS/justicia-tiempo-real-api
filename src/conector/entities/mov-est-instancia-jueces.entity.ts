import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('mov_est_instancia_jueces')
export class MovEstInstanciaJueces {
  @PrimaryGeneratedColumn()
  n_id_instancia_juez: number;

  @Column({ type: 'varchar', length: 200 })
  x_resolucion: string;

  @Column({ type: 'varchar', length: 100 })
  x_pdf_res: string;

  @Column({ type: 'datetime', precision: 6 })
  f_fecha_creacion: Date;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  f_fecha_baja: Date;

  @Column({ type: 'varchar', length: 1 })
  l_activo: string;

  @Column({ type: 'int' })
  n_id_juez_id: number;

  @Column({ type: 'int' })
  n_instancia_id: number;

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
