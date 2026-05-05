import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ContentListPage from './pages/ContentListPage';
import ContentFormPage from './pages/ContentFormPage';
import CategoriesPage from './pages/CategoriesPage';
import GlossaryPage from './pages/GlossaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            
            {/* Content Routes */}
            <Route path="/content" element={<ContentListPage />} />
            <Route path="/content/new" element={<ContentFormPage />} />
            <Route path="/content/:id/edit" element={<ContentFormPage />} />
            
            {/* Other Modules */}
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#1A9E3F',
              secondary: '#fff',
            },
          },
        }} 
      />
    </BrowserRouter>
  );
}

export default App;
