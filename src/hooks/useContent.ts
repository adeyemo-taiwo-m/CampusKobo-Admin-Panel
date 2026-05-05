import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { LearningContent } from '../types';
import toast from 'react-hot-toast';

export const useAllContent = () => {
  return useQuery({
    queryKey: ['content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_content')
        .select('*, learning_categories(name)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as LearningContent[];
    },
  });
};

export const useContentById = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('learning_content')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as LearningContent;
    },
    enabled: !!id,
  });
};

export const useAddContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: Partial<LearningContent>) => {
      const { data, error } = await supabase
        .from('learning_content')
        .insert([content])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Content added successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add content');
    }
  });
};

export const useUpdateContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...content }: Partial<LearningContent> & { id: string }) => {
      const { data, error } = await supabase
        .from('learning_content')
        .update(content)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Content updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update content');
    }
  });
};

export const useDeleteContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('learning_content')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Content deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete content');
    }
  });
};
