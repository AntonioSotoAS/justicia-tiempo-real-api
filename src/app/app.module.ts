import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { EstadisticaModule } from './estadistica/estadistica.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    AuthModule,
    SeedModule,
    EstadisticaModule,
    SolicitudesModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
