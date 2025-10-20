import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('mae_est_sexos')
export class MaeEstSexos {
  @PrimaryGeneratedColumn()
  n_id_sexo: number;

  @Column({ type: 'varchar', length: 20 })
  x_descripcion: string;

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
