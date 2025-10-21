import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SeedRunnerService } from './seed-runner.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SeedController],
  providers: [SeedService, SeedRunnerService],
  exports: [SeedService],
})
export class SeedModule {}
