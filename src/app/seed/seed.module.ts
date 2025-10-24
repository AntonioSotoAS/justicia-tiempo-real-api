import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SeedRunnerService } from './seed-runner.service';
import { WhatsappModule } from '../whatsapp/whatsapp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    WhatsappModule
  ],
  controllers: [SeedController],
  providers: [SeedService, SeedRunnerService],
  exports: [SeedService],
})
export class SeedModule {}
