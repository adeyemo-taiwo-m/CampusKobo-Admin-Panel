import React from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TopBarProps {
  title: string;
  onRefresh?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ title, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <h2 className="text-lg font-bold text-gray-900 font-sans">{title}</h2>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium">
          <span>Last synced: just now</span>
          <button 
            onClick={handleRefresh}
            className={cn(
              'p-1 hover:bg-gray-100 rounded-md transition-all',
              isRefreshing && 'text-[#1A9E3F]'
            )}
          >
            <RefreshCw size={14} className={cn(isRefreshing && 'animate-spin')} />
          </button>
        </div>
        
        <div className="h-4 w-px bg-gray-200" />
        
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#1A9E3F] text-white flex items-center justify-center text-xs font-bold ring-2 ring-white shadow-sm">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
