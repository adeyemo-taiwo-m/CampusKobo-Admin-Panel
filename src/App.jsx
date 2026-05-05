import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-area">
          <Routes>
            <Route path="/" element={<><Header title="Dashboard Overview" /><div className="container"><Dashboard /></div></>} />
            <Route path="/content" element={<><Header title="Content Management" /><div className="container"><h2>Content Management</h2></div></>} />
            <Route path="/categories" element={<><Header title="Categories" /><div className="container"><h2>Categories</h2></div></>} />
            <Route path="/glossary" element={<><Header title="Glossary Terms" /><div className="container"><h2>Glossary Terms</h2></div></>} />
          </Routes>
        </main>
      </div>

      <style jsx>{`
        .app-container {
          display: flex;
          min-height: 100vh;
          width: 100%;
        }

        .main-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-main);
          overflow-y: auto;
        }

        .container {
          padding: 2rem;
        }
      `}</style>
    </Router>
  );
}

export default App;
