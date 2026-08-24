import { useState, useMemo } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { useCart } from '../../hooks/useCart';
import MenuCard from '../../components/customer/MenuCard';
import CategoryFilter from '../../components/customer/CategoryFilter';
import { CATEGORIES } from '../../utils/constants';

export default function MenuPage() {
  const { getAvailable } = useMenu();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [sortBy, setSortBy] = useState('default');

  const availableItems = getAvailable();

  const filteredAndSorted = useMemo(() => {
    let items = activeCategory === 'Tümü'
      ? availableItems
      : availableItems.filter(item => item.category === activeCategory);

    switch (sortBy) {
      case 'price-asc':
        items = [...items].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items = [...items].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return items;
  }, [availableItems, activeCategory, sortBy]);

  return (
    <div className="section bg-cream-50">
      <div className="container-custom">
        {/* Page header */}
        <div className="text-center mb-10">
          <span className="text-brand-400 font-body text-sm font-semibold uppercase tracking-widest">
            Altın Kebap Evi
          </span>
          <h1 className="mt-3 page-title">Menümüz</h1>
          <p className="mt-4 text-earth-400 max-w-2xl mx-auto">
            Geleneksel Türk mutfağının en seçkin lezzetleri, taze malzemelerle özenle hazırlanır.
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <CategoryFilter
            categories={['Tümü', ...CATEGORIES]}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-earth-500 font-medium whitespace-nowrap">
              Sırala:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select py-2 px-3 text-sm w-auto min-w-[160px]"
            >
              <option value="default">Varsayılan</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-earth-400 mb-6">
          {filteredAndSorted.length} ürün bulundu
        </p>

        {/* Menu grid */}
        {filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSorted.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={addItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🍽️</p>
            <p className="text-earth-400 text-lg">Bu kategoride ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
