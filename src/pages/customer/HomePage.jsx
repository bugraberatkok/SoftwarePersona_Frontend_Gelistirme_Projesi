import { Link } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import MenuCard from '../../components/customer/MenuCard';
import { useCart } from '../../hooks/useCart';

export default function HomePage() {
  const { getFeatured } = useMenu();
  const { addItem } = useCart();
  const featuredItems = getFeatured();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-earth-700 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=800&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative container-custom py-24 md:py-32 lg:py-40">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-block text-brand-300 font-body text-sm font-semibold uppercase tracking-widest mb-4">
              Geleneksel Türk Lezzetleri
            </span>
            <h1 className="text-cream-50 mb-6">
              Altın Kebap Evi
            </h1>
            <p className="text-lg md:text-xl text-cream-200 leading-relaxed mb-8 max-w-xl">
              Taze malzemeler, özenli hazırlık ve nesillerden aktarılan tariflerle
              unutulmaz bir kebap deneyimi sunuyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary text-lg px-8 py-4">
                Menüyü Keşfet
              </Link>
              <a href="#featured" className="btn-secondary border-cream-300 text-cream-200 hover:bg-white/10 text-lg px-8 py-4">
                Öne Çıkanlar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-cream-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand-400 font-body text-sm font-semibold uppercase tracking-widest">
                Hikayemiz
              </span>
              <h2 className="mt-3 mb-6 text-earth-800">
                Ateşle Pişen Lezzetler
              </h2>
              <p className="text-earth-500 leading-relaxed mb-4">
                Altın Kebap Evi olarak, geleneksel Türk mutfağını modern bir anlayışla
                misafirlerimize sunuyoruz. Her bir yemeğimiz, taze malzemeler ve özenli
                hazırlık ile sofralarınıza ulaşır.
              </p>
              <p className="text-earth-500 leading-relaxed">
                Kömür ateşinde pişen kebaplarımız, fırından yeni çıkan pidelerimiz ve
                geleneksel mezelerimiz ile sizi özel bir lezzet yolculuğuna davet ediyoruz.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=450&fit=crop"
                alt="Restoran ambiyansı"
                className="rounded-2xl shadow-lg w-full object-cover h-[350px]"
              />
              <div className="absolute -bottom-4 -left-4 bg-brand-400 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="font-heading font-bold text-lg">20+ Yıl</p>
                <p className="text-sm text-brand-100">Tecrübe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured" className="section bg-cream-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-brand-400 font-body text-sm font-semibold uppercase tracking-widest">
              Şefin Tercihleri
            </span>
            <h2 className="mt-3 text-earth-800">
              Öne Çıkan Lezzetler
            </h2>
            <p className="mt-4 text-earth-400 max-w-2xl mx-auto">
              En sevilen ve en çok tercih edilen yemeklerimizi sizin için seçtik.
            </p>
          </div>
          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredItems.slice(0, 6).map((item) => (
                <MenuCard key={item.id} item={item} onAddToCart={addItem} />
              ))}
            </div>
          ) : (
            <p className="text-center text-earth-400">Henüz öne çıkan ürün bulunmuyor.</p>
          )}
          <div className="text-center mt-10">
            <Link to="/menu" className="btn-primary">
              Tüm Menüyü Gör →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Info Strip */}
      <section className="bg-earth-700 text-cream-100">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '20+', label: 'Çeşit Yemek' },
              { value: '6', label: 'Kategori' },
              { value: '10', label: 'Masa Kapasitesi' },
              { value: '4.8★', label: 'Müşteri Puanı' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-3xl md:text-4xl font-bold text-brand-300">
                  {stat.value}
                </p>
                <p className="text-sm text-cream-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
