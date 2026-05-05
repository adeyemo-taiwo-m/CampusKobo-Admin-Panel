import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import SearchBar from '../components/ui/SearchBar';
import Table from '../components/ui/Table';
import Badge from '../components/ui/Badge';
import ConfirmModal from '../components/ui/ConfirmModal';
import EmptyState from '../components/ui/EmptyState';
import { useAllContent, useDeleteContent } from '../hooks/useContent';
import { useAllCategories } from '../hooks/useCategories';
import { FileText, Pencil, Trash2, Filter } from 'lucide-react';
import { formatDate, truncate } from '../lib/utils';
import Select from '../components/ui/Select';

const ContentListPage = () => {
  const navigate = useNavigate();
  const { data: content, isLoading: contentLoading } = useAllContent();
  const { data: categories } = useAllCategories();
  const deleteMutation = useDeleteContent();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredContent = useMemo(() => {
    if (!content) return [];
    return content.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || item.category_id === categoryFilter;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [content, searchTerm, typeFilter, categoryFilter]);

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMutation.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...(categories?.map((cat) => ({ value: cat.id, label: cat.name })) || [])
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'article', label: 'Articles' },
    { id: 'video', label: 'Videos' },
    { id: 'podcast', label: 'Podcasts' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Content"
        subtitle="Manage articles, videos, and podcasts"
        action={
          <Button onClick={() => navigate('/content/new')}>
            + Add Content
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between">
        <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
          <SearchBar 
            value={searchTerm} 
            onChange={setSearchTerm} 
            placeholder="Search content by title..."
            className="md:max-w-sm"
          />
          
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setTypeFilter(t.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  typeFilter === t.id
                    ? 'bg-[#1A9E3F] text-white shadow-md'
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-56">
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onValueChange={setCategoryFilter}
            placeholder="Filter by category"
          />
        </div>
      </div>

      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
        <Filter size={12} />
        {filteredContent.length} items found
      </div>

      {/* Content Table */}
      {contentLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 w-full bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredContent.length > 0 ? (
        <div className="card">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>Title</Table.Head>
                <Table.Head>Type</Table.Head>
                <Table.Head>Category</Table.Head>
                <Table.Head>Featured</Table.Head>
                <Table.Head>Date Added</Table.Head>
                <Table.Head className="text-right">Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {filteredContent.map((item) => (
                <Table.Row 
                  key={item.id} 
                  onClick={() => navigate(`/content/${item.id}/edit`)}
                >
                  <Table.Cell className="font-bold text-gray-900 max-w-xs">
                    {truncate(item.title, 50)}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={item.type}>{item.type}</Badge>
                  </Table.Cell>
                  <Table.Cell className="text-xs font-medium text-gray-600">
                    {item.learning_categories?.name || '—'}
                  </Table.Cell>
                  <Table.Cell>
                    {item.is_featured ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A9E3F]">
                        <div className="h-2 w-2 rounded-full bg-[#1A9E3F]" />
                        Yes
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300">
                        <div className="h-2 w-2 rounded-full bg-gray-200" />
                        No
                      </div>
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-xs text-gray-500 font-medium">
                    {formatDate(item.created_at)}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => navigate(`/content/${item.id}/edit`)}
                        className="p-1.5 text-gray-400 hover:text-[#1A9E3F] hover:bg-green-50 rounded-md transition-all"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteId(item.id)}
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
            icon={FileText}
            title="No content found"
            subtitle="Try adjusting your search or filters to find what you're looking for."
            actionLabel="+ Add New Content"
            onAction={() => navigate('/content/new')}
          />
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Content?"
        message={`This will permanently remove this item from the app. This cannot be undone.`}
        confirmLabel="Delete Content"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ContentListPage;
