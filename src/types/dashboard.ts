export interface DashboardStats {
  totalPublications: number;
  totalCitations: number;
  hIndex: number;
  collaborators: number;
  publicationsTrend: {
    publications: number;
    citations: number;
  };
}

export interface ChartData {
  year: string;
  value: number;
}

export interface Collaborator {
  id: string;
  name: string;
  initials: string;
  institution: string;
  jointPublications: number;
  avatar?: string;
}