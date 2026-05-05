import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Tag, BookOpen, LogOut, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { logout, user } = useAuth();
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: FileText, label: 'Content', path: '/content' },
    { icon: Tag, label: 'Categories', path: '/categories' },
    { icon: BookOpen, label: 'Glossary', path: '/glossary' },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0F1923] text-white flex flex-col sticky top-0 border-r border-[#1E2D3D]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col items-start gap-2">
            <img src="/logo.svg" alt="CampusKobo Logo" className="h-10 w-auto object-contain" />
            <span className="text-[10px] uppercase tracking-widest text-[#22C55E] font-bold ml-1">Admin Panel</span>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <div className="h-px bg-[#1E2D3D] w-full" />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) => cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group',
              isActive 
                ? 'bg-[#1A9E3F]/10 border-l-2 border-[#1A9E3F] text-[#22C55E]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            <item.icon size={18} className={cn(
              'transition-colors',
              'group-hover:text-white'
            )} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 border-top border-[#1E2D3D]">
        <div className="mb-4">
          <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Logged in as</p>
          <p className="text-xs text-gray-300 truncate">{user?.email || 'admin@campuskobo.com'}</p>
        </div>
        <button 
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
        <p className="text-[10px] text-gray-600 mt-4 text-center">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
