import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { SeedRunnerService } from './seed-runner.service';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], 'default'),
  ],
  providers: [SeedService, SeedRunnerService],
  controllers: [SeedController],
  exports: [SeedService],
})
export class SeedModule {}
