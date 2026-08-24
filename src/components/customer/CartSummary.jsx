import { formatPrice } from '../../utils/formatters';

export default function CartSummary({ totalItems, totalPrice }) {
  return (
    <div>
      <h3 className="font-heading text-lg font-semibold text-earth-700 mb-4">
        Sipariş Özeti
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-earth-500">
          <span>Toplam Ürün</span>
          <span className="font-medium">{totalItems} adet</span>
        </div>
        <div className="flex justify-between pt-3 border-t border-cream-200">
          <span className="font-heading text-lg font-bold text-earth-800">Toplam</span>
          <span className="font-heading text-xl font-bold text-brand-500">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
