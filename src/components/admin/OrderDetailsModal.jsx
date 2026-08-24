import { formatPrice, formatDate } from '../../utils/formatters';
import { STATUS_LABELS, ADMIN_STATUS_COLORS } from '../../utils/constants';

export default function OrderDetailsModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
      <div className="w-full max-w-lg bg-admin-600 rounded-xl shadow-2xl border border-admin-500 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-admin-500">
          <div>
            <h2 className="text-xl font-bold text-gray-100">{order.id}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{formatDate(order.createdAt)}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors p-1"
            aria-label="Kapat"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Müşteri</p>
              <p className="text-sm font-medium text-gray-200 mt-1">{order.customerName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Masa</p>
              <p className="text-sm font-medium text-gray-200 mt-1">Masa {order.tableNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Durum</p>
              <span className={`badge mt-1 ${ADMIN_STATUS_COLORS[order.status]}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Ürün Sayısı</p>
              <p className="text-sm font-medium text-gray-200 mt-1">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)} adet
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-admin-500 pt-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Sipariş İçeriği</p>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-brand-400">{item.quantity}×</span>
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-admin-500">
            <span className="font-bold text-gray-200">Toplam</span>
            <span className="text-xl font-bold text-brand-400">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-admin-500">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-admin-500 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
