import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'default'), // Conexión principal
    UsersModule,
    AuthModule,
    SeedModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
