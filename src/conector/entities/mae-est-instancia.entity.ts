import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('mae_est_instancia')
export class MaeEstInstancia {
  @PrimaryGeneratedColumn()
  n_instancia_id: number;

  @Column({ type: 'varchar', length: 3 })
  c_distrito: string;

  @Column({ type: 'varchar', length: 4 })
  c_provincia: string;

  @Column({ type: 'varchar', length: 3 })
  c_instancia: string;

  @Column({ type: 'varchar', length: 60 })
  x_nom_instancia: string;

  @Column({ type: 'int' })
  n_instancia: number;

  @Column({ type: 'int' })
  n_modulo: number;

  @Column({ type: 'varchar', length: 1 })
  l_modulo_ejecucion: string;

  @Column({ type: 'varchar', length: 4 })
  x_corto: string;

  @Column({ type: 'varchar', length: 1 })
  l_ind_baja: string;

  @Column({ type: 'varchar', length: 2 })
  c_org_jurisd_id: string;

  @Column({ type: 'varchar', length: 4 })
  c_sede_id: string;

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
