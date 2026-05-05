import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import EmptyState from '../components/ui/EmptyState';
import ConfirmModal from '../components/ui/ConfirmModal';
import Badge from '../components/ui/Badge';
import { BookOpen, Pencil, Trash2, Star } from 'lucide-react';
import { useAllGlossaryTerms, useAddGlossaryTerm, useUpdateGlossaryTerm, useDeleteGlossaryTerm, useSetTermOfDay } from '../hooks/useGlossary';
import { formatDate, truncate } from '../lib/utils';
import type { GlossaryTerm } from '../types';
import Select from '../components/ui/Select';

const GlossaryPage = () => {
  const [searchParams] = useSearchParams();
  const { data: terms, isLoading } = useAllGlossaryTerms();
  const addMutation = useAddGlossaryTerm();
  const updateMutation = useUpdateGlossaryTerm();
  const deleteMutation = useDeleteGlossaryTerm();
  const setTermOfDayMutation = useSetTermOfDay();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTerm, setEditingTerm] = useState<GlossaryTerm | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<GlossaryTerm>>({
    term: '',
    part_of_speech: 'noun',
    definition: '',
    example: '',
    related_terms: []
  });

  useEffect(() => {
    if (searchParams.get('addNew') === 'true') {
      openAddModal();
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingTerm(null);
    setFormData({ term: '', part_of_speech: 'noun', definition: '', example: '', related_terms: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (term: GlossaryTerm) => {
    setEditingTerm(term);
    setFormData(term);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTerm) {
      await updateMutation.mutateAsync({ id: editingTerm.id, ...formData });
    } else {
      await addMutation.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const posOptions = [
    { value: 'noun', label: 'Noun' },
    { value: 'verb', label: 'Verb' },
    { value: 'adjective', label: 'Adjective' },
    { value: 'phrase', label: 'Phrase' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Glossary"
        subtitle="Financial terms and definitions"
        action={
          <Button onClick={openAddModal}>
            + Add Term
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : terms && terms.length > 0 ? (
        <div className="card">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Term</Table.Head>
                <Table.Head>Type</Table.Head>
                <Table.Head>Definition</Table.Head>
                <Table.Head>Term of Day</Table.Head>
                <Table.Head>Created</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {terms.map((term) => (
                <Table.Row key={term.id}>
                  <Table.Cell className="font-bold text-gray-900">{term.term}</Table.Cell>
                  <Table.Cell>
                    <span className="text-xs font-bold text-gray-400 italic">{term.part_of_speech}</span>
                  </Table.Cell>
                  <Table.Cell className="text-sm text-gray-500 max-w-sm">
                    {truncate(term.definition, 80)}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => setTermOfDayMutation.mutate(term.id)}
                      className={`p-1.5 rounded-full transition-all ${
                        term.is_term_of_day 
                          ? 'bg-amber-100 text-amber-600' 
                          : 'text-gray-200 hover:text-amber-300'
                      }`}
                      title={term.is_term_of_day ? 'Current Term of the Day' : 'Set as Term of the Day'}
                    >
                      <Star size={18} fill={term.is_term_of_day ? 'currentColor' : 'none'} />
                    </button>
                  </Table.Cell>
                  <Table.Cell className="text-xs text-gray-400">
                    {formatDate(term.created_at)}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(term)}
                        className="p-1.5 text-gray-400 hover:text-[#1A9E3F] hover:bg-green-50 rounded-md transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteId(term.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="card py-12">
          <EmptyState
            icon={BookOpen}
            title="No terms found"
            subtitle="Add financial terms that students can learn from."
            actionLabel="+ Add Term"
            onAction={openAddModal}
          />
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTerm ? 'Edit Term' : 'Add Term'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Term"
              placeholder="e.g. Liquidity"
              value={formData.term}
              onChange={(e) => setFormData({ ...formData, term: e.target.value })}
              required
            />
            <Select
              label="Part of Speech"
              options={posOptions}
              value={formData.part_of_speech}
              onValueChange={(val) => setFormData({ ...formData, part_of_speech: val as any })}
              required
            />
          </div>
          
          <Textarea
            label="Definition"
            placeholder="What does this term mean?"
            value={formData.definition}
            onChange={(e) => setFormData({ ...formData, definition: e.target.value })}
            required
            rows={4}
          />
          
          <Textarea
            label="Example Usage (Optional)"
            placeholder="Use this term in a sentence..."
            value={formData.example || ''}
            onChange={(e) => setFormData({ ...formData, example: e.target.value })}
            rows={2}
          />

          <Input
            label="Related Terms"
            placeholder="Asset, Cash, Solvency"
            value={formData.related_terms?.join(', ') || ''}
            onChange={(e) => setFormData({ 
              ...formData, 
              related_terms: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
            })}
            hint="Comma-separated list of terms"
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={addMutation.isPending || updateMutation.isPending}>
              Save Term
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Term?"
        message="This will permanently remove this term from the glossary. This cannot be undone."
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default GlossaryPage;
