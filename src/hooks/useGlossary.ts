import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { GlossaryTerm } from '../types';
import toast from 'react-hot-toast';

export const useAllGlossaryTerms = () => {
  return useQuery({
    queryKey: ['glossary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('glossary_terms')
        .select('*')
        .order('term');
      
      if (error) throw error;
      return data as GlossaryTerm[];
    },
  });
};

export const useAddGlossaryTerm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (term: Partial<GlossaryTerm>) => {
      const { data, error } = await supabase
        .from('glossary_terms')
        .insert([term])
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
      toast.success('Glossary term added');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to add term');
    }
  });
};

export const useUpdateGlossaryTerm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...term }: Partial<GlossaryTerm> & { id: string }) => {
      const { data, error } = await supabase
        .from('glossary_terms')
        .update(term)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
      toast.success('Glossary term updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update term');
    }
  });
};

export const useDeleteGlossaryTerm = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('glossary_terms')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
      toast.success('Glossary term deleted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete term');
    }
  });
};

export const useSetTermOfDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      // 1. Reset all terms
      const { error: resetError } = await supabase
        .from('glossary_terms')
        .update({ is_term_of_day: false })
        .neq('id', ''); // Update all
      
      if (resetError) throw resetError;

      // 2. Set chosen term
      const { error: setError } = await supabase
        .from('glossary_terms')
        .update({ is_term_of_day: true })
        .eq('id', id);
      
      if (setError) throw setError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glossary'] });
      toast.success('Term of the Day updated');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to set term of day');
    }
  });
};
