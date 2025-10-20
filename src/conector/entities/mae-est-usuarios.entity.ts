import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('mae_est_usuarios')
export class MaeEstUsuarios {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 128 })
  password: string;

  @Column({ type: 'datetime', precision: 6, nullable: true })
  last_login: Date;

  @Column({ type: 'tinyint', width: 1 })
  is_superuser: boolean;

  @Column({ type: 'varchar', length: 150 })
  username: string;

  @Column({ type: 'varchar', length: 254 })
  email: string;

  @Column({ type: 'tinyint', width: 1 })
  is_staff: boolean;

  @Column({ type: 'tinyint', width: 1 })
  is_active: boolean;

  @Column({ type: 'datetime', precision: 6 })
  date_joined: Date;

  @Column({ type: 'varchar', length: 8 })
  x_dni: string;

  @Column({ type: 'varchar', length: 50 })
  x_nombres: string;

  @Column({ type: 'varchar', length: 40 })
  x_app_paterno: string;

  @Column({ type: 'varchar', length: 40 })
  x_app_materno: string;

  @Column({ type: 'varchar', length: 15 })
  x_telefono: string;

  @Column({ type: 'varchar', length: 100 })
  profile_image: string;

  @Column({ type: 'tinyint', width: 1 })
  l_mensaje: boolean;

  @Column({ type: 'int' })
  n_id_sexo_id: number;

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
}
