import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import { useAllCategories } from '../hooks/useCategories';
import { useAddContent, useUpdateContent, useContentById, useDeleteContent } from '../hooks/useContent';
import { 
  Plus, 
  Trash2, 
  ChevronLeft, 
  FileText, 
  PlayCircle, 
  Mic,
  AlertCircle,
  Save,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { LearningContent } from '../types';
import ConfirmModal from '../components/ui/ConfirmModal';

const ContentFormPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: categories } = useAllCategories();
  const { data: existingContent, isLoading: contentLoading } = useContentById(id || '');
  const addMutation = useAddContent();
  const updateMutation = useUpdateContent();
  const deleteMutation = useDeleteContent();

  const [formData, setFormData] = useState<Partial<LearningContent>>({
    id: '',
    title: '',
    type: (searchParams.get('type') as any) || 'article',
    duration: '',
    content: '',
    category_id: '',
    episode_number: null,
    is_featured: false,
    key_takeaways: ['', '', ''],
    related_content_ids: []
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEditMode && existingContent) {
      setFormData({
        ...existingContent,
        key_takeaways: existingContent.key_takeaways || ['', '', '']
      });
    }
  }, [isEditMode, existingContent]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.id?.trim()) newErrors.id = 'Content ID is required';
    else if (!/^[a-z0-9-]+$/.test(formData.id)) newErrors.id = 'Only lowercase letters, numbers, and hyphens allowed';
    
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      if (isEditMode) {
        await updateMutation.mutateAsync(formData as any);
      } else {
        await addMutation.mutateAsync(formData);
      }
      navigate('/content');
    } catch (err) {
      // Error handled by mutation
    }
  };

  const handleTakeawayChange = (index: number, value: string) => {
    const newTakeaways = [...(formData.key_takeaways || [])];
    newTakeaways[index] = value;
    setFormData({ ...formData, key_takeaways: newTakeaways });
  };

  const addTakeaway = () => {
    setFormData({ ...formData, key_takeaways: [...(formData.key_takeaways || []), ''] });
  };

  const removeTakeaway = (index: number) => {
    const newTakeaways = (formData.key_takeaways || []).filter((_, i) => i !== index);
    setFormData({ ...formData, key_takeaways: newTakeaways });
  };

  if (isEditMode && contentLoading) {
    return <div className="h-64 flex items-center justify-center animate-pulse bg-gray-100 rounded-xl" />;
  }

  const categoryOptions = categories?.map(cat => ({ value: cat.id, label: cat.name })) || [];
  const selectedCategoryName = categories?.find(c => c.id === formData.category_id)?.name;
  const isFinance101 = selectedCategoryName === 'Finance 101';

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={() => navigate('/content')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-500" />
        </button>
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Back to List</span>
      </div>

      <PageHeader
        title={isEditMode ? 'Edit Content' : 'Add New Content'}
        subtitle={isEditMode ? `Updating "${formData.title}"` : 'Create a new article, video, or podcast'}
      />

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 space-y-8">
            {/* Type Selector */}
            <div className="flex items-center p-1 bg-gray-50 rounded-xl w-fit">
              {[
                { id: 'article', icon: FileText, label: 'Article' },
                { id: 'video', icon: PlayCircle, label: 'Video' },
                { id: 'podcast', icon: Mic, label: 'Podcast' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  disabled={isEditMode}
                  onClick={() => setFormData({ ...formData, type: type.id as any })}
                  className={cn(
                    'flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all',
                    formData.type === type.id 
                      ? 'bg-white shadow-sm text-[#1A9E3F]' 
                      : 'text-gray-400 hover:text-gray-600 disabled:opacity-50'
                  )}
                >
                  <type.icon size={18} />
                  {type.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Content ID"
                placeholder="e.g. art-003"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                disabled={isEditMode}
                error={errors.id}
                required
                hint="Must be unique. Lowercase, numbers, and hyphens only."
              />
              <Input
                label="Duration"
                placeholder={formData.type === 'article' ? 'e.g. 5 min read' : 'e.g. 10 min'}
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                hint={formData.type === 'article' ? 'Add "read" for articles' : 'Total length in minutes'}
              />
            </div>

            <Input
              label="Title"
              placeholder="Enter a compelling title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              required
            />

            <Textarea
              label="Content Body"
              placeholder="Write the full content here..."
              value={formData.content || ''}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
            />

            {/* Key Takeaways */}
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700">Key Takeaways</label>
                <span className="text-xs text-gray-400">Add 3–5 short bullet points summarizing the content</span>
              </div>
              
              <div className="space-y-3">
                {formData.key_takeaways?.map((takeaway, index) => (
                  <div key={index} className="flex gap-2 group">
                    <div className="flex-1">
                      <Input
                        placeholder={`Takeaway #${index + 1}`}
                        value={takeaway}
                        onChange={(e) => handleTakeawayChange(index, e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTakeaway(index)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTakeaway}
                  className="flex items-center gap-2 text-sm font-bold text-[#1A9E3F] hover:text-[#16803A] p-2"
                >
                  <Plus size={16} />
                  Add Takeaway
                </button>
              </div>
            </div>

            <Input
              label="Related Content IDs"
              placeholder="art-001, vid-002"
              value={formData.related_content_ids?.join(', ') || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                related_content_ids: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
              })}
              hint="Comma-separated list of IDs to show as related content"
            />
          </div>
        </div>

        {/* Sidebar Settings Area */}
        <div className="space-y-6">
          <div className="card p-6 space-y-6 sticky top-20">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#1A9E3F]" />
              Publish Settings
            </h3>

            <Select
              label="Category"
              options={categoryOptions}
              value={formData.category_id || ''}
              onValueChange={(val) => setFormData({ ...formData, category_id: val })}
              error={errors.category_id}
              required
            />

            {isFinance101 && (
              <Input
                label="Episode Number"
                type="number"
                value={formData.episode_number?.toString() || ''}
                onChange={(e) => setFormData({ ...formData, episode_number: parseInt(e.target.value) || null })}
                hint="Specific order in the Finance 101 series"
              />
            )}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="space-y-0.5">
                <label className="text-sm font-bold text-gray-900">Mark as Featured</label>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">Main Hub Hero</p>
              </div>
              <input 
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="h-5 w-5 accent-[#1A9E3F] cursor-pointer"
              />
            </div>

            {formData.is_featured && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-amber-700 text-xs font-medium">
                <AlertCircle size={14} className="mt-0.5" />
                <p>This will replace the current featured item on the student app home screen.</p>
              </div>
            )}

            <div className="pt-4 space-y-3">
              <Button 
                type="submit" 
                className="w-full h-12 shadow-lg shadow-[#1A9E3F33]"
                loading={addMutation.isPending || updateMutation.isPending}
              >
                <Save size={18} className="mr-2" />
                {isEditMode ? 'Save Changes' : 'Publish Content'}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full" 
                onClick={() => navigate('/content')}
              >
                Cancel
              </Button>
            </div>

            {isEditMode && (
              <div className="pt-6 border-t border-gray-100">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest mb-1">Danger Zone</h4>
                  <p className="text-[11px] text-red-600 mb-3">Removing this will permanently delete it from the student app.</p>
                  <Button 
                    type="button" 
                    variant="danger" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete Content
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      <ConfirmModal
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={async () => {
          if (id) {
            await deleteMutation.mutateAsync(id);
            navigate('/content');
          }
        }}
        title="Permanently Delete?"
        message="This action cannot be undone. This content will be removed from all student apps immediately."
        confirmLabel="Yes, Delete Permanently"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ContentFormPage;
