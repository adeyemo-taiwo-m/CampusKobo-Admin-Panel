import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="flex h-screen w-full">
      {/* Left Column - Desktop Only */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0F1923] p-12 relative overflow-hidden">
        <div className="relative z-10">
          <img src="/logo.svg" alt="CampusKobo Logo" className="h-20 w-auto object-contain" />
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-serif italic text-white leading-tight mb-6">
            "Empowering students to take control of their financial future."
          </h2>
          <p className="text-gray-400 font-medium">
            BOF OAU — Bureau of Finance, Obafemi Awolowo University
          </p>
        </div>

        {/* CSS Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#1A9E3F 1px, transparent 0)',
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[380px] space-y-8">
          <div>
            <h3 className="text-3xl font-serif text-gray-900 mb-2">Admin Login</h3>
            <p className="text-sm text-gray-500 font-medium">Sign in to manage CampusKobo content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="admin@campuskobo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <Input
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-base shadow-lg shadow-[#1A9E3F33]"
              loading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-8">
            CampusKobo Admin Panel v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
