export interface User {
  id: string;
  name: string;
  email: string;
  role: 'researcher' | 'team_leader' | 'lab_chief' | 'institute_director' | 'city_coordinator' | 'national_coordinator';
  orcid?: string;
  avatar?: string;
  institution?: string;
  department?: string;
}