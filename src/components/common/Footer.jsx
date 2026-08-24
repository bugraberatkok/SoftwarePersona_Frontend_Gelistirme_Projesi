import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-earth-700 text-cream-200">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-2xl">🔥</span>
              <span className="font-heading text-2xl font-bold text-brand-300">
                Altın Kebap Evi
              </span>
            </Link>
            <p className="text-cream-300 text-sm leading-relaxed max-w-xs">
              Geleneksel Türk lezzetlerini modern bir dokunuşla sunuyoruz.
              Taze malzemeler, özenli hazırlık, unutulmaz tatlar.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream-100 mb-4">
              Hızlı Bağlantılar
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-cream-300 hover:text-brand-300 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-sm text-cream-300 hover:text-brand-300 transition-colors">
                  Menü
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-cream-300 hover:text-brand-300 transition-colors">
                  Sepet
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-cream-100 mb-4">
              İletişim
            </h4>
            <ul className="space-y-2 text-sm text-cream-300">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+90 (212) 555 0123</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Her gün 11:00 – 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-earth-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-400">
            © {currentYear} Altın Kebap Evi. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-cream-400">
            Frontend Proje — React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
