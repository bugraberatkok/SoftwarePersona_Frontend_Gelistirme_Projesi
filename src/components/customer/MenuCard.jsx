import { formatPrice } from '../../utils/formatters';

export default function MenuCard({ item, onAddToCart }) {
  return (
    <div className="card overflow-hidden group animate-fade-in">
      {/* Image */}
      <div className="relative overflow-hidden h-48 sm:h-52">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.featured && (
            <span className="badge bg-brand-400 text-white shadow-md">⭐ Öne Çıkan</span>
          )}
          {item.spicy && (
            <span className="badge bg-red-500 text-white shadow-md">🌶️ Acılı</span>
          )}
        </div>
        {!item.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="badge bg-gray-800 text-white text-sm">Tükendi</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Category tag */}
        <span className="text-xs font-body font-semibold uppercase tracking-wider text-brand-400">
          {item.category}
        </span>

        <h3 className="font-heading text-lg font-semibold text-earth-800 mt-1 mb-2">
          {item.name}
        </h3>

        <p className="text-sm text-earth-400 line-clamp-2 mb-3 leading-relaxed">
          {item.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-earth-400 mb-4">
          {item.preparationTime && (
            <span className="flex items-center gap-1">
              🕐 {item.preparationTime}
            </span>
          )}
          {item.calories && (
            <span className="flex items-center gap-1">
              🔥 {item.calories} kcal
            </span>
          )}
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-center justify-between pt-3 border-t border-cream-100">
          <span className="font-heading text-xl font-bold text-brand-500">
            {formatPrice(item.price)}
          </span>
          <button
            id={`add-to-cart-${item.id}`}
            onClick={() => onAddToCart(item)}
            disabled={!item.available}
            className="btn-primary py-2 px-4 text-sm"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
