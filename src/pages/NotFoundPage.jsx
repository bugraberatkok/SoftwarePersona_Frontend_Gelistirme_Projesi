import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="text-center animate-fade-in">
        <p className="text-8xl mb-6">🍽️</p>
        <h1 className="font-heading text-6xl font-bold text-earth-700 mb-4">404</h1>
        <h2 className="font-heading text-2xl text-earth-600 mb-4">Sayfa Bulunamadı</h2>
        <p className="text-earth-400 max-w-md mx-auto mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          Menümüze göz atarak lezzetlerimizi keşfedin!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
          <Link to="/menu" className="btn-secondary">
            Menüye Git
          </Link>
        </div>
      </div>
    </div>
  );
}
