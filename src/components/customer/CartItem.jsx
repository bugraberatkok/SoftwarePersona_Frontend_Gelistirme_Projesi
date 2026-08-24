import { formatPrice } from '../../utils/formatters';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="card p-4 md:p-5 flex gap-4 animate-fade-in">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold text-earth-800 truncate">
            {item.name}
          </h3>
          <button
            id={`remove-cart-item-${item.menuItemId}`}
            onClick={() => onRemove(item.menuItemId)}
            className="text-earth-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
            aria-label="Ürünü kaldır"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-sm text-earth-400 mt-1">
          Birim fiyat: {formatPrice(item.price)}
        </p>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity controls */}
          <div className="flex items-center gap-1">
            <button
              id={`decrease-qty-${item.menuItemId}`}
              onClick={() => onUpdateQuantity(item.menuItemId, item.quantity - 1)}
              className="w-8 h-8 rounded-lg border border-cream-300 flex items-center justify-center text-earth-600 hover:bg-cream-100 transition-colors font-bold"
            >
              −
            </button>
            <span className="w-10 text-center font-body font-semibold text-earth-800">
              {item.quantity}
            </span>
            <button
              id={`increase-qty-${item.menuItemId}`}
              onClick={() => onUpdateQuantity(item.menuItemId, item.quantity + 1)}
              className="w-8 h-8 rounded-lg border border-cream-300 flex items-center justify-center text-earth-600 hover:bg-cream-100 transition-colors font-bold"
            >
              +
            </button>
          </div>

          {/* Subtotal */}
          <span className="font-heading text-lg font-bold text-brand-500">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
