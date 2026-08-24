import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const navLinks = [
    { to: '/',     label: 'Ana Sayfa' },
    { to: '/menu', label: 'Menü' },
    { to: '/cart', label: 'Sepet' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-cream-200 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🔥</span>
            <div>
              <span className="font-heading text-xl md:text-2xl font-bold text-earth-700 group-hover:text-brand-500 transition-colors">
                Altın Kebap
              </span>
              <span className="hidden sm:inline font-heading text-xl md:text-2xl font-bold text-brand-400 ml-1">
                Evi
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-body font-medium text-sm uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'text-brand-500'
                      : 'text-earth-500 hover:text-brand-400'
                  }`
                }
              >
                {link.label}
                {link.to === '/cart' && totalItems > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-brand-400 text-white rounded-full">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-earth-600 hover:bg-cream-100 transition-colors relative"
            aria-label="Menüyü aç"
          >
            {/* Cart badge on mobile */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold bg-brand-400 text-white rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-cream-200 py-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-body font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-500'
                        : 'text-earth-600 hover:bg-cream-100'
                    }`
                  }
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    {link.to === '/cart' && totalItems > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-brand-400 text-white rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
