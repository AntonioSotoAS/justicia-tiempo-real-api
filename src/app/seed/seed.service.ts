import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seedUsers(): Promise<void> {
    // Verificar si ya existen usuarios
    const existingUsers = await this.userRepository.count();
    if (existingUsers > 0) {
      console.log('Los usuarios ya existen, saltando seed...');
      return;
    }

    // Crear usuarios de prueba
    const users = [
      {
        email: 'superadmin@justibot.com',
        password: 'superadmin123', // Sin hashear, se hasheará automáticamente en la entidad
        name: 'Super Admin',
        role: 'superadmin',
      },
      {
        email: 'admin@justibot.com',
        password: 'admin123', // Sin hashear, se hasheará automáticamente en la entidad
        name: 'Admin Test',
        role: 'admin',
      },
      {
        email: 'user@justibot.com',
        password: 'user123', // Sin hashear, se hasheará automáticamente en la entidad
        name: 'User Test',
        role: 'user',
      },
      {
        email: 'moderator@justibot.com',
        password: 'moderator123', // Sin hashear, se hasheará automáticamente en la entidad
        name: 'Moderator Test',
        role: 'moderator',
      },
    ];

    for (const userData of users) {
      const user = this.userRepository.create(userData);
      await this.userRepository.save(user);
    }

    console.log('Usuarios de prueba creados exitosamente');
  }
}
