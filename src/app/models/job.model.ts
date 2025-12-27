export interface Job {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  type: string;
  salary: string;
  logo: string;
  remote?: boolean;
  bookmarked?: boolean;
}