import { Injectable } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './dto/create-job.dto';
import { JobQueryDto } from './dto/job-query.dto';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRepository) {}

  async create(createJobDto: CreateJobDto): Promise<string> {
    // Generate simple keywords for search (Free tier alternative to Algolia)
    const keywords = this.generateKeywords([
      createJobDto.title,
      createJobDto.company,
      ...createJobDto.techStack,
    ]);

    const jobData: Job = {
      ...createJobDto,
      keywords,
      isActive: true,
      source: 'manual',
      // Expires in 30 days
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };

    return this.jobsRepository.create(jobData);
  }

  async findAll(query: JobQueryDto) {
    return this.jobsRepository.findAllWithFilters(query);
  }

  async findOne(id: string) {
    return this.jobsRepository.findById(id);
  }

  async remove(id: string) {
    return this.jobsRepository.delete(id);
  }

  // --- Helper: Search Tokenizer ---
  private generateKeywords(inputs: string[]): string[] {
    const set = new Set<string>();

    inputs.forEach((input) => {
      if (!input) return;
      // Split by space, comma, or slash
      const words = input.toLowerCase().split(/[\s,\/]+/);
      words.forEach((w) => {
        if (w.length > 1) set.add(w); // Ignore single chars
      });
    });

    return Array.from(set);
  }
}
