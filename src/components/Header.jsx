import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="header glass">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <Search size={18} />
          <input type="text" placeholder="Search anything..." />
        </div>
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">BOF OAU Editor</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 80px;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid var(--border);
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-main);
          padding: 0.5rem 1rem;
          border-radius: 100px;
          border: 1px solid var(--border);
          width: 300px;
          color: var(--text-muted);
        }

        .search-bar input {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          color: var(--text-main);
          font-size: 0.9rem;
        }

        .icon-btn {
          background: transparent;
          color: var(--text-muted);
          box-shadow: none;
          padding: 0.5rem;
          position: relative;
        }

        .icon-btn:hover {
          background: var(--bg-main);
          color: var(--primary);
          transform: none;
          box-shadow: none;
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--danger);
          border-radius: 50%;
          border: 2px solid var(--bg-card);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-left: 1.5rem;
          border-left: 1px solid var(--border);
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }
      `}</style>
    </header>
  );
};

export default Header;
