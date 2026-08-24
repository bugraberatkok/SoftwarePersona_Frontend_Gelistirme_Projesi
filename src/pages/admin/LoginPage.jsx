import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already authenticated, redirect
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Lütfen kullanıcı adı ve şifre girin.');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Geçersiz kullanıcı adı veya şifre.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-700 px-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Brand */}
        <div className="text-center mb-8">
          <span className="text-4xl">🔥</span>
          <h1 className="font-heading text-3xl font-bold text-brand-400 mt-3">
            Admin Panel
          </h1>
          <p className="text-gray-500 text-sm mt-2">Altın Kebap Evi Yönetim Paneli</p>
        </div>

        {/* Login card */}
        <div className="admin-card p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <label htmlFor="admin-username" className="block text-sm font-medium text-gray-400 mb-1.5">
                  Kullanıcı Adı
                </label>
                <input
                  id="admin-username"
                  type="text"
                  className="admin-input"
                  placeholder="Kullanıcı adınızı girin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-400 mb-1.5">
                  Şifre
                </label>
                <input
                  id="admin-password"
                  type="password"
                  className="admin-input"
                  placeholder="Şifrenizi girin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm mt-4">{error}</p>
            )}

            <button
              id="admin-login-btn"
              type="submit"
              className="btn-primary w-full mt-6"
            >
              Giriş Yap
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-3 rounded-lg bg-admin-700 border border-admin-500">
            <p className="text-xs text-gray-500 text-center">
              Demo giriş bilgileri: <span className="text-gray-400 font-mono">admin</span> / <span className="text-gray-400 font-mono">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
