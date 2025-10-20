import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User, 'default')
    private readonly userRepository: Repository<User>,
  ) {}

  async createSuperAdmin(): Promise<User> {
    // Verificar si ya existe un superadmin
    const existingSuperAdmin = await this.userRepository.findOne({
      where: { email: 'superadmin@justibot.com' }
    });

    if (existingSuperAdmin) {
      console.log('✅ Superadmin ya existe:', existingSuperAdmin.email);
      return existingSuperAdmin;
    }

    // Crear superadmin
    const superAdmin = this.userRepository.create({
      name: 'Super Admin',
      email: 'superadmin@justibot.com',
      password: 'superadmin123', // Se hasheará automáticamente
      role: 'superadmin',
      isActive: true,
    });

    const savedSuperAdmin = await this.userRepository.save(superAdmin);
    
    console.log('🎉 Superadmin creado exitosamente:');
    console.log('📧 Email:', savedSuperAdmin.email);
    console.log('🔑 Password: superadmin123');
    console.log('👑 Role:', savedSuperAdmin.role);
    console.log('🆔 ID:', savedSuperAdmin.id);

    return savedSuperAdmin;
  }

  async createTestUsers(): Promise<User[]> {
    const testUsers = [
      {
        name: 'Admin Test',
        email: 'admin@justibot.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'User Test',
        email: 'user@justibot.com',
        password: 'user123',
        role: 'user',
      },
      {
        name: 'Moderator Test',
        email: 'moderator@justibot.com',
        password: 'moderator123',
        role: 'moderator',
      }
    ];

    const createdUsers: User[] = [];

    for (const userData of testUsers) {
      // Verificar si el usuario ya existe
      const existingUser = await this.userRepository.findOne({
        where: { email: userData.email }
      });

      if (existingUser) {
        console.log(`✅ Usuario ya existe: ${userData.email}`);
        createdUsers.push(existingUser);
        continue;
      }

      // Crear usuario
      const user = this.userRepository.create(userData);
      const savedUser = await this.userRepository.save(user);
      createdUsers.push(savedUser);
      
      console.log(`🎉 Usuario creado: ${savedUser.email} (${savedUser.role})`);
    }

    return createdUsers;
  }

  async runSeed(): Promise<void> {
    console.log('🌱 Iniciando proceso de seed...');
    
    try {
      // Crear superadmin
      await this.createSuperAdmin();
      
      // Crear usuarios de prueba
      await this.createTestUsers();
      
      console.log('✅ Seed completado exitosamente!');
      console.log('\n📋 Usuarios disponibles para testing:');
      console.log('👑 Superadmin: superadmin@justibot.com / superadmin123');
      console.log('👨‍💼 Admin: admin@justibot.com / admin123');
      console.log('👤 User: user@justibot.com / user123');
      console.log('🛡️ Moderator: moderator@justibot.com / moderator123');
      
    } catch (error) {
      console.error('❌ Error durante el seed:', error);
      throw error;
    }
  }
}
