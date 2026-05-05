export interface LearningCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string | null;
  created_at: string;
}

export interface LearningContent {
  id: string;
  category_id: string | null;
  type: 'article' | 'video' | 'podcast';
  title: string;
  duration: string | null;
  content: string | null;
  is_featured: boolean;
  key_takeaways: string[];
  related_content_ids: string[];
  episode_number: number | null;
  created_at: string;
  learning_categories?: LearningCategory;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  part_of_speech: string;
  definition: string;
  example: string | null;
  related_terms: string[];
  is_term_of_day: boolean;
  created_at: string;
}

export interface DashboardStats {
  totalContent: number;
  totalCategories: number;
  totalGlossaryTerms: number;
  finance101Count: number;
  featuredCount: number;
  recentContent: LearningContent[];
}
