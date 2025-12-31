import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { FirebaseAuthGuard } from '../common/guards/auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createJobDto: CreateJobDto) {
    const id = await this.jobsService.create(createJobDto);
    return { id, message: 'Job posted successfully' };
  }

  @Get()
  async findAll(@Query() query: JobQueryDto) {
    return this.jobsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(FirebaseAuthGuard)
  async remove(@Param('id') id: string) {
    await this.jobsService.remove(id);
    return { message: 'Job deleted successfully' };
  }
}
