import { EmploymentType, ExperienceLevel } from "./job.models";

export interface FiltersData {
  locations: string[];
  techStacks: string[];
  employmentTypes: EmploymentType[];
  experienceLevels: ExperienceLevel[];
}
