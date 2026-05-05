import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { DashboardStats, LearningContent } from '../types';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const [
        { count: totalContent },
        { count: totalCategories },
        { count: totalGlossaryTerms },
        { count: finance101Count },
        { count: featuredCount },
        { data: recentContent }
      ] = await Promise.all([
        supabase.from('learning_content').select('*', { count: 'exact', head: true }),
        supabase.from('learning_categories').select('*', { count: 'exact', head: true }),
        supabase.from('glossary_terms').select('*', { count: 'exact', head: true }),
        supabase.from('learning_content').select('*, learning_categories!inner(name)', { count: 'exact', head: true }).eq('learning_categories.name', 'Finance 101'),
        supabase.from('learning_content').select('*', { count: 'exact', head: true }).eq('is_featured', true),
        supabase.from('learning_content').select('*, learning_categories(name)').order('created_at', { ascending: false }).limit(5)
      ]);

      return {
        totalContent: totalContent || 0,
        totalCategories: totalCategories || 0,
        totalGlossaryTerms: totalGlossaryTerms || 0,
        finance101Count: finance101Count || 0,
        featuredCount: featuredCount || 0,
        recentContent: (recentContent || []) as LearningContent[]
      } as DashboardStats;
    },
  });
};
