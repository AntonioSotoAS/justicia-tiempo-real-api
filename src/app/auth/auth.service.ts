import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { LoginDto, RegisterDto, AuthResponseDto, ChangePasswordDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'default')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email }
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Crear nuevo usuario
    const user = this.userRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: registerDto.password,
      role: registerDto.role || 'user',
    });

    const savedUser = await this.userRepository.save(user);

    // Generar tokens
    const tokens = await this.generateTokens(savedUser);

    return {
      ...tokens,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        isActive: savedUser.isActive,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    console.log(`[LOGIN] Intentando login para email: ${loginDto.email}`);
    
    // Buscar usuario por email
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email }
    });

    if (!user) {
      console.log(`[LOGIN] Usuario no encontrado para email: ${loginDto.email}`);
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    console.log(`[LOGIN] Usuario encontrado: ID=${user.id}, Email=${user.email}, Activo=${user.isActive}`);

    // Verificar si el usuario está activo
    if (!user.isActive) {
      console.log(`[LOGIN] Usuario inactivo: ${user.email}`);
      throw new UnauthorizedException('Usuario inactivo. Contacta al administrador.');
    }

    // Verificar contraseña
    console.log(`[LOGIN] Verificando contraseña para usuario: ${user.email}`);
    const isPasswordValid = await user.validatePassword(loginDto.password);
    console.log(`[LOGIN] Resultado validación contraseña: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log(`[LOGIN] Contraseña incorrecta para usuario: ${user.email}`);
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    console.log(`[LOGIN] Login exitoso para usuario: ${user.email}`);
    
    // Generar tokens
    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    };
  }

  async refreshToken(refreshToken: string): Promise<{ access_token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
      });

      const user = await this.userRepository.findOne({
        where: { id: payload.sub }
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Token de actualización inválido');
      }

      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role },
        { expiresIn: '15m' }
      );

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Token de actualización inválido');
    }
  }

  async logout(userId: number): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isCurrentPasswordValid = await user.validatePassword(changePasswordDto.currentPassword);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    user.password = changePasswordDto.newPassword;
    await this.userRepository.save(user);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email }
    });

    if (user && await user.validatePassword(password)) {
      const { password, refreshToken, ...result } = user;
      return result;
    }
    return null;
  }

  async debugUsers() {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email', 'role', 'isActive', 'createdAt']
    });
    
    console.log('[DEBUG] Usuarios en la base de datos:', users);
    
    return {
      total: users.length,
      users: users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }))
    };
  }

  private async generateTokens(user: User): Promise<{ access_token: string; refresh_token: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { 
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key'
    });

    // Guardar refresh token en la base de datos
    await this.userRepository.update(user.id, { refreshToken: refresh_token });

    return { access_token, refresh_token };
  }
}
