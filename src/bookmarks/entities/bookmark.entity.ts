export class Bookmark {
  id?: string; // We will enforce id = userId_jobId
  userId: string;
  jobId: string;
  createdAt: Date;
}
