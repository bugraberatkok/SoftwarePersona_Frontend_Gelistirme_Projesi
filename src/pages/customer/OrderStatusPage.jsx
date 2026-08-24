import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import { formatPrice, formatDate } from '../../utils/formatters';
import StatusBadge from '../../components/common/StatusBadge';

export default function OrderStatusPage() {
  const { id } = useParams();
  const { getById } = useOrders();
  const order = getById(id);

  if (!order) {
    return (
      <div className="section bg-cream-50">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center py-16">
            <p className="text-6xl mb-6">🔍</p>
            <h2 className="text-earth-700 mb-4">Sipariş Bulunamadı</h2>
            <p className="text-earth-400 mb-8">
              Aradığınız sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.
            </p>
            <Link to="/menu" className="btn-primary">
              Menüye Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section bg-cream-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="page-title mb-3">Siparişiniz Alındı!</h1>
            <p className="text-earth-400 text-lg">
              Siparişiniz mutfağımıza iletildi. Aşağıda detayları görebilirsiniz.
            </p>
          </div>

          {/* Order details card */}
          <div className="card p-6 md:p-8 animate-slide-up">
            {/* Order header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-cream-200">
              <div>
                <p className="text-sm text-earth-400">Sipariş No</p>
                <p className="font-heading text-2xl font-bold text-earth-800">{order.id}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            {/* Customer info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-cream-200">
              <div>
                <p className="text-sm text-earth-400">Müşteri</p>
                <p className="font-medium text-earth-700">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-earth-400">Masa</p>
                <p className="font-medium text-earth-700">Masa {order.tableNumber}</p>
              </div>
              <div>
                <p className="text-sm text-earth-400">Tarih</p>
                <p className="font-medium text-earth-700">{formatDate(order.createdAt)}</p>
              </div>
            </div>

            {/* Order items */}
            <div className="mb-6">
              <h3 className="font-heading text-lg font-semibold text-earth-700 mb-4">
                Sipariş İçeriği
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-cream-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-brand-50 text-brand-500 rounded-full text-sm font-bold">
                        {item.quantity}×
                      </span>
                      <span className="font-medium text-earth-700">{item.name}</span>
                    </div>
                    <span className="font-medium text-earth-600">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-earth-200">
              <span className="font-heading text-xl font-bold text-earth-800">Toplam</span>
              <span className="font-heading text-2xl font-bold text-brand-500">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
            <Link to="/menu" className="btn-primary">
              Tekrar Sipariş Ver
            </Link>
            <Link to="/" className="btn-secondary">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
