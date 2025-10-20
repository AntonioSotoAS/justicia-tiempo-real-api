import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 50, default: 'user' })
  role: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string | null;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password && !this.password.startsWith('$2a$')) {
      console.log(`[HASH] Hasheando contraseña para usuario: ${this.email}`);
      this.password = await bcrypt.hash(this.password, 12);
      console.log(`[HASH] Contraseña hasheada exitosamente para: ${this.email}`);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    console.log(`[VALIDATE] Validando contraseña para usuario: ${this.email}`);
    console.log(`[VALIDATE] Contraseña almacenada (hash): ${this.password.substring(0, 20)}...`);
    const isValid = await bcrypt.compare(password, this.password);
    console.log(`[VALIDATE] Resultado validación: ${isValid}`);
    return isValid;
  }
}
