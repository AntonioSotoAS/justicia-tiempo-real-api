import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'default'), // Conexión principal
    UsersModule,
  ],
  exports: [TypeOrmModule],
})
export class AppModule {}
