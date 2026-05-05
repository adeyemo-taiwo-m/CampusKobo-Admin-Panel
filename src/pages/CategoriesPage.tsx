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
import { Tag, Pencil, Trash2 } from 'lucide-react';
import { useAllCategories, useAddCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories';
import { formatDate, slugify, truncate } from '../lib/utils';
import { LearningCategory } from '../types';

const CategoriesPage = () => {
  const [searchParams] = useSearchParams();
  const { data: categories, isLoading } = useAllCategories();
  const addMutation = useAddCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<LearningCategory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<LearningCategory>>({
    name: '',
    slug: '',
    description: '',
    icon_name: ''
  });

  useEffect(() => {
    if (searchParams.get('addNew') === 'true') {
      openAddModal();
    }
  }, [searchParams]);

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', icon_name: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (category: LearningCategory) => {
    setEditingCategory(category);
    setFormData(category);
    setIsModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    setFormData({ 
      ...formData, 
      name, 
      slug: editingCategory ? formData.slug : slugify(name) 
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      await updateMutation.mutateAsync({ id: editingCategory.id, ...formData });
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

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Categories"
        subtitle="Manage learning content categories"
        action={
          <Button onClick={openAddModal}>
            + Add Category
          </Button>
        }
      />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : categories && categories.length > 0 ? (
        <div className="card">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head>Slug</Table.Head>
                <Table.Head>Description</Table.Head>
                <Table.Head>Icon</Table.Head>
                <Table.Head>Date Added</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {categories.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell className="font-bold text-gray-900">{category.name}</Table.Cell>
                  <Table.Cell>
                    <code className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
                      {category.slug}
                    </code>
                  </Table.Cell>
                  <Table.Cell className="text-sm text-gray-500 max-w-xs">
                    {truncate(category.description || '—', 60)}
                  </Table.Cell>
                  <Table.Cell className="text-xs font-medium text-gray-400">
                    {category.icon_name || '—'}
                  </Table.Cell>
                  <Table.Cell className="text-xs text-gray-500">
                    {formatDate(category.created_at)}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(category)}
                        className="p-1.5 text-gray-400 hover:text-[#1A9E3F] hover:bg-green-50 rounded-md transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteId(category.id)}
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
            icon={Tag}
            title="No categories found"
            subtitle="Get started by creating your first content category."
            actionLabel="+ Add Category"
            onAction={openAddModal}
          />
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        size="md"
      >
        <form onSubmit={handleSave} className="space-y-6 pt-2">
          <Input
            label="Category Name"
            placeholder="e.g. Budgeting"
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
          />
          <Input
            label="Slug"
            placeholder="budgeting"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
            required
            hint="Used in the app's URLs and internal logic"
            className="font-mono"
          />
          <Textarea
            label="Description"
            placeholder="What kind of content goes in this category?"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
          <Input
            label="Icon Name"
            placeholder="wallet-outline"
            value={formData.icon_name || ''}
            onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
            hint="Ionicons name used in the mobile app"
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={addMutation.isPending || updateMutation.isPending}>
              Save Category
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category?"
        message="This will remove the category from all content that uses it. This cannot be undone."
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default CategoriesPage;
