import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';
import { useDashboardStats } from '../hooks/useDashboard';
import { 
  FileText, 
  Tag, 
  BookOpen, 
  Star, 
  GraduationCap, 
  TrendingUp, 
  ChevronRight,
  PlayCircle,
  Mic,
  Mic,
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react';
import { formatDate, truncate } from '../lib/utils';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';

const DashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-16 w-1/3 bg-gray-200 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Content', value: stats?.totalContent, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Categories', value: stats?.totalCategories, icon: Tag, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Glossary Terms', value: stats?.totalGlossaryTerms, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Featured', value: stats?.featuredCount, icon: Star, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Finance 101', value: stats?.finance101Count, icon: GraduationCap, color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <PageHeader 
        title="Dashboard" 
        subtitle="Overview of your CampusKobo learning content" 
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="card p-6 flex flex-col justify-between group hover:border-[#1A9E3F] transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className={cn('p-2.5 rounded-lg', stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-wider">
                <TrendingUp size={12} />
                <span>Stable</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-serif font-bold text-gray-900 leading-none mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-semibold text-gray-900">Recently Added</h3>
            <button 
              onClick={() => navigate('/content')}
              className="text-sm font-bold text-[#1A9E3F] hover:text-[#16803A] flex items-center gap-1 group"
            >
              View all <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="card">
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head className="w-12"></Table.Head>
                  <Table.Head>Title</Table.Head>
                  <Table.Head>Type</Table.Head>
                  <Table.Head>Category</Table.Head>
                  <Table.Head>Date Added</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {stats?.recentContent.map((item) => (
                  <Table.Row 
                    key={item.id} 
                    onClick={() => navigate(`/content/${item.id}/edit`)}
                  >
                    <Table.Cell>
                      <div className="h-8 w-8 rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
                        {item.cover_image_url ? (
                          <img src={item.cover_image_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-gray-50 flex items-center justify-center text-gray-300">
                            <ImageIcon size={12} />
                          </div>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="font-bold text-gray-900">
                      {truncate(item.title, 40)}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={item.type}>{item.type}</Badge>
                    </Table.Cell>
                    <Table.Cell className="text-xs font-medium text-gray-500">
                      {item.learning_categories?.name || '—'}
                    </Table.Cell>
                    <Table.Cell className="text-xs text-gray-400">
                      {formatDate(item.created_at)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif font-semibold text-gray-900">Quick Actions</h3>
          <div className="card p-4 space-y-2">
            {[
              { label: 'Add Article', path: '/content/new?type=article', icon: FileText, color: 'bg-blue-100 text-blue-600' },
              { label: 'Add Video', path: '/content/new?type=video', icon: PlayCircle, color: 'bg-purple-100 text-purple-600' },
              { label: 'Add Podcast', path: '/content/new?type=podcast', icon: Mic, color: 'bg-orange-100 text-orange-600' },
              { label: 'Add Glossary Term', path: '/glossary?addNew=true', icon: BookOpen, color: 'bg-gray-100 text-gray-600' },
              { label: 'Add Category', path: '/categories?addNew=true', icon: Tag, color: 'bg-green-100 text-[#1A9E3F]' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.path)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', action.color)}>
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{action.label}</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for conditional classNames
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default DashboardPage;
