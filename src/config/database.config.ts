import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Configuración única para la base de datos principal
export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'naruto20',
  database: process.env.DB_DATABASE || 'justibot',
  entities: [__dirname + '/../app/**/*.entity{.ts,.js}'],
  timezone: 'Z',
  charset: 'utf8mb4',
  synchronize: true, // Habilitar sincronización para crear tablas
  logging: ['error', 'warn', 'query'],
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secret-key',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'refresh-secret-key',
  expiresIn: '15m',
  refreshExpiresIn: '7d',
};
