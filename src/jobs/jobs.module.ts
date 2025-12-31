import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';

@Module({
  controllers: [JobsController],
  providers: [JobsService, JobsRepository],
  exports: [JobsRepository], // Exported so Bookmarks can verify job existence
})
export class JobsModule {}
