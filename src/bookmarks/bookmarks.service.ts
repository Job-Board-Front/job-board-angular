import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { JobsRepository } from '../jobs/jobs.repository';

@Injectable()
export class BookmarksService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly jobsRepository: JobsRepository,
  ) {}

  private get collection() {
    return this.firebaseService.firestore.collection('bookmarks');
  }

  async addBookmark(userId: string, jobId: string) {
    // 1. Check if job exists
    try {
      await this.jobsRepository.findById(jobId);
    } catch (e) {
      throw new NotFoundException('Job not found');
    }

    // 2. Create deterministic ID to prevent duplicates
    const bookmarkId = `${userId}_${jobId}`;
    const docRef = this.collection.doc(bookmarkId);

    const doc = await docRef.get();
    if (doc.exists) {
      throw new ConflictException('Job already bookmarked');
    }

    await docRef.set({
      userId,
      jobId,
      createdAt: new Date(),
    });

    return { message: 'Bookmarked' };
  }

  async removeBookmark(userId: string, jobId: string) {
    const bookmarkId = `${userId}_${jobId}`;
    await this.collection.doc(bookmarkId).delete();
    return { message: 'Bookmark removed' };
  }

  async getUserBookmarks(userId: string) {
    // 1. Get all bookmark IDs for user
    const snapshot = await this.collection.where('userId', '==', userId).get();

    if (snapshot.empty) return [];

    const jobIds = snapshot.docs.map((doc) => doc.data().jobId);

    // 2. Fetch Job Details
    // NOTE: Firestore 'in' query supports max 10 values.
    // For scalability, we fetch documents individually in parallel.
    // This is valid in Firestore as it supports HTTP/2 multiplexing.

    const jobRefs = jobIds.map((id) =>
      this.firebaseService.firestore.collection('jobs').doc(id).get(),
    );

    const jobSnapshots = await Promise.all(jobRefs);

    return jobSnapshots
      .filter((doc) => doc.exists) // Handle cases where job might have been deleted
      .map((doc) => {
        const data = doc.data();
        // Transform timestamp manually here or reuse repository mapper
        return {
          id: doc.id,
          ...data,
          createdAt: data?.createdAt?.toDate(),
          expiresAt: data?.expiresAt?.toDate(),
        };
      });
  }
}
