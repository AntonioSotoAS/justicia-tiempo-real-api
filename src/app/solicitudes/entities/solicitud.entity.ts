import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum EstadoSolicitud {
  PENDIENTE = 'pendiente',
  ERROR = 'error',
  ENVIADO = 'enviado',
  ENVIANDO = 'enviando',
  FALLIDO = 'fallido'
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

  // Campos del mensaje
  @Column({ type: 'text', nullable: true })
  encuesta: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  whatsapp: string;

  @Column({ type: 'datetime', nullable: true })
  fechaEnvio: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  horaEnvio: string;

  @Column({ type: 'datetime', nullable: true })
  fechaCorte: Date;

  // Campos de jueces
  @Column({ type: 'varchar', length: 100, nullable: true })
  instancia: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  modulo_nom: string;

  @Column({ type: 'int', nullable: true })
  meta_preliminar: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  nivel_prod: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  pct_real_avance: number;

  @Column({ type: 'int', nullable: true })
  niv_bueno: number;

  @Column({ type: 'int', nullable: true })
  niv_muy_bueno: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  resoluciones: string;

  // Campos del juez
  @Column({ type: 'varchar', length: 200, nullable: true })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono_juez: string;

  @Column({ type: 'boolean', default: true })
  l_mensaje: boolean;

  @Column({ type: 'varchar', length: 20, nullable: true })
  sexo: string;

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

  // Campos para WhatsApp
  @Column({ type: 'varchar', length: 100, nullable: true })
  whatsappMessageId: string | null;

  @Column({ type: 'text', nullable: true })
  whatsappError: string | null;

  @Column({ type: 'datetime', nullable: true })
  whatsappSentAt: Date | null;

  @Column({ type: 'datetime', nullable: true })
  whatsappDeliveredAt: Date | null;

  @Column({ type: 'datetime', nullable: true })
  whatsappReadAt: Date | null;
}
