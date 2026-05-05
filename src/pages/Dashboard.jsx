import React from 'react';
import { BookOpen, Layers, Type, PlayCircle, Plus, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Content', value: '124', icon: <BookOpen />, color: '#4f46e5' },
    { label: 'Categories', value: '12', icon: <Layers />, color: '#10b981' },
    { label: 'Glossary Terms', value: '256', icon: <Type />, color: '#f59e0b' },
    { label: 'Finance 101', value: '8', icon: <PlayCircle />, color: '#ef4444' },
  ];

  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
            <div className="stat-trend">
              <TrendingUp size={16} />
              <span>12%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-sections">
        <div className="recent-table card">
          <div className="section-header">
            <h2>Recently Added Content</h2>
            <button className="btn-small">View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'The Power of Compounding', type: 'Article', category: 'Investing', status: 'Published' },
                { title: 'Student Budgeting 101', type: 'Video', category: 'Budgeting', status: 'Draft' },
                { title: 'Savings Goals for Gen Z', type: 'Article', category: 'Savings', status: 'Published' },
                { title: 'Emergency Funds Explained', type: 'Podcast', category: 'Finance 101', status: 'Published' },
              ].map((item, i) => (
                <tr key={i}>
                  <td>{item.title}</td>
                  <td><span className={`badge-type ${item.type.toLowerCase()}`}>{item.type}</span></td>
                  <td>{item.category}</td>
                  <td><span className={`status-dot ${item.status.toLowerCase()}`}></span>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="quick-actions card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <Plus size={20} />
              <span>Add Content</span>
            </button>
            <button className="action-btn secondary">
              <Plus size={20} />
              <span>Add Category</span>
            </button>
            <button className="action-btn secondary">
              <Plus size={20} />
              <span>Add Term</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          overflow: hidden;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .stat-trend {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--success);
          font-weight: 600;
        }

        .content-sections {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .btn-small {
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: 1rem;
          color: var(--text-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border);
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
        }

        .badge-type {
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .badge-type.article { background: #e0e7ff; color: #4338ca; }
        .badge-type.video { background: #dcfce7; color: #15803d; }
        .badge-type.podcast { background: #fef3c7; color: #b45309; }

        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 0.5rem;
        }

        .status-dot.published { background: var(--success); }
        .status-dot.draft { background: var(--warning); }

        .actions-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .action-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .action-btn.secondary {
          background: transparent;
          border: 1px dashed var(--border);
          color: var(--text-main);
        }

        .action-btn.secondary:hover {
          background: var(--bg-main);
          border-color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
