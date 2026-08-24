import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const links = [
    { to: '/admin',        label: 'Dashboard',  icon: '📊', end: true },
    { to: '/admin/menu',   label: 'Menü Yönetimi', icon: '🍽️', end: false },
    { to: '/admin/orders', label: 'Siparişler',    icon: '📋', end: false },
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-admin-800 border-r border-admin-600 min-h-screen">
        {/* Brand */}
        <div className="p-6 border-b border-admin-600">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-heading text-lg font-bold text-brand-400">
              Admin Panel
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Altın Kebap Evi</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-400/15 text-brand-400'
                    : 'text-gray-400 hover:bg-admin-600 hover:text-gray-200'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t border-admin-600">
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
          >
            <span className="text-lg">🚪</span>
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Mobile admin nav bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-admin-800 border-t border-admin-600 px-2 py-1">
        <div className="flex items-center justify-around">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-[10px] font-medium transition-colors ${
                  isActive
                    ? 'text-brand-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg text-[10px] font-medium text-gray-500 hover:text-red-400 transition-colors"
          >
            <span className="text-lg">🚪</span>
            Çıkış
          </button>
        </div>
      </div>
    </>
  );
}
