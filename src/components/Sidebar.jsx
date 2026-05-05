import React from 'react';
import { Home, BookOpen, Layers, Type, LogOut, ChevronRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <BookOpen size={20} />, label: 'Content', path: '/content' },
    { icon: <Layers size={20} />, label: 'Categories', path: '/categories' },
    { icon: <Type size={20} />, label: 'Glossary', path: '/glossary' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">CK</div>
        <span>CampusKobo Admin</span>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.label} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
            <ChevronRight size={14} className="chevron" />
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: var(--bg-card);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          transition: all 0.3s ease;
        }

        .sidebar-brand {
          padding: 2rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary);
        }

        .logo {
          width: 32px;
          height: 32px;
          background: var(--primary);
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0.5rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-item:hover {
          background: var(--bg-main);
          color: var(--text-main);
        }

        .nav-item.active {
          background: rgba(79, 70, 229, 0.1);
          color: var(--primary);
        }

        .nav-item .chevron {
          margin-left: auto;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .nav-item:hover .chevron, .nav-item.active .chevron {
          opacity: 1;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          color: var(--danger);
          border: 1px solid transparent;
          box-shadow: none;
          padding: 0.75rem 1rem;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.05);
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
