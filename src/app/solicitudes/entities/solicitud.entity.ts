import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum EstadoSolicitud {
  PENDIENTE = 'pendiente',
  ERROR = 'error',
  ENVIADO = 'enviado'
}

export enum PrioridadSolicitud {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta',
  URGENTE = 'urgente'
}

@Entity('solicitudes')
export class Solicitud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  mMetaPreliminar: string;

  @Column({ type: 'text', nullable: true })
  mTResueltos: string;

  @Column({ type: 'text', nullable: true })
  mAvanMeta: string;

  @Column({ type: 'text', nullable: true })
  NivProduc: string;

  @Column({ type: 'text', nullable: true })
  encuesta_retroalimentacion: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numero_consulta: string;

  @Column({ type: 'text', nullable: true })
  anexo_consulta: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  whatsapp_consulta: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  numerojuez: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  nombresapellidsojuez: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  instaciajuez: string;

  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @Column({ type: 'time', nullable: true })
  hora: string;

  @Column({ 
    type: 'enum', 
    enum: EstadoSolicitud, 
    default: EstadoSolicitud.PENDIENTE 
  })
  estado: EstadoSolicitud;

  @Column({ 
    type: 'enum', 
    enum: PrioridadSolicitud, 
    default: PrioridadSolicitud.MEDIA 
  })
  prioridad: PrioridadSolicitud;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updatedAt: Date;
}
