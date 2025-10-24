import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { EstadisticaModule } from './estadistica/estadistica.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    SeedModule,
    EstadisticaModule,
    SolicitudesModule,
    WhatsappModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
