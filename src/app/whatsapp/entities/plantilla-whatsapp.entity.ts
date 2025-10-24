import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TipoPlantilla {
  MUY_BUENO = 'MUY_BUENO',
  BUENO = 'BUENO',
  BAJO = 'BAJO'
}

@Entity('plantillas_whatsapp')
export class PlantillaWhatsapp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoPlantilla,
    unique: true
  })
  tipo: TipoPlantilla;

  @Column('text')
  plantilla: string;

  @Column({ default: true })
  activa: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
