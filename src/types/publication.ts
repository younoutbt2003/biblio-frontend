export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  doi?: string;
  citations: number;
  type: 'article' | 'review' | 'conference' | 'book_chapter';
  abstract?: string;
}