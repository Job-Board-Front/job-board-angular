export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string | null;
  candidate_required_location: string;
  job_type: string;
  salary?: string | null;
  category: string;
  publication_date: string;
  description?: string;
  tags?: string[];
  [key: string]: any; 
}