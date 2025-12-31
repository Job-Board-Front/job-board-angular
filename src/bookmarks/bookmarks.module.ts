import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksController } from './bookmarks.controller';
import { JobsModule } from '../jobs/jobs.module'; // Import to use JobsRepository

@Module({
  imports: [JobsModule],
  controllers: [BookmarksController],
  providers: [BookmarksService],
})
export class BookmarksModule {}
