import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Configuración para la base de datos de estadísticas (solo lectura)
export const estadisticasDbConfig: TypeOrmModuleOptions = {
  name: 'estadisticas',
  type: 'mysql',
  host: process.env.ESTADISTICAS_DB_HOST || 'localhost',
  port: parseInt(process.env.ESTADISTICAS_DB_PORT || '3306', 10),
  username: process.env.ESTADISTICAS_DB_USERNAME || 'root',
  password: process.env.ESTADISTICAS_DB_PASSWORD || 'naruto20',
  database: process.env.ESTADISTICAS_DB_DATABASE || 'csjsanta_indicadores',
  entities: [__dirname + '/../conector/entities/*.entity{.ts,.js}'],
  timezone: 'Z',
  charset: 'utf8mb4',
  synchronize: false, // Solo lectura
  logging: ['error', 'warn'],
  extra: {
    // Configuración para solo lectura
    readOnly: true,
  },
};

// Configuración para tu base de datos principal (lectura/escritura)
export const mainDbConfig: TypeOrmModuleOptions = {
  name: 'default',
  type: 'mysql',
  host: process.env.MAIN_DB_HOST || 'localhost',
  port: parseInt(process.env.MAIN_DB_PORT || '3306', 10),
  username: process.env.MAIN_DB_USERNAME || 'root',
  password: process.env.MAIN_DB_PASSWORD || 'naruto20',
  database: process.env.MAIN_DB_DATABASE || 'justibot',
  entities: [__dirname + '/../app/entities/*.entity{.ts,.js}'],
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
