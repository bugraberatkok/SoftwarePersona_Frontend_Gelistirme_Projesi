import { formatPrice, formatDateShort } from '../../utils/formatters';
import { STATUS_LABELS, ADMIN_STATUS_COLORS, STATUS_TRANSITIONS } from '../../utils/constants';

export default function OrderTable({ orders, onStatusChange, onViewDetails }) {
  if (orders.length === 0) {
    return (
      <div className="admin-card p-12 text-center">
        <p className="text-4xl mb-4">📋</p>
        <p className="text-gray-400 text-lg">Henüz sipariş yok.</p>
        <p className="text-gray-500 text-sm mt-2">Müşteriler sipariş verdiğinde burada görünecek.</p>
      </div>
    );
  }

  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-admin-500">
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Sipariş</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Müşteri</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Masa</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Toplam</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tarih</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-600">
            {orders.map((order) => {
              const transitions = STATUS_TRANSITIONS[order.status] || [];
              const statusColor = ADMIN_STATUS_COLORS[order.status] || '';

              return (
                <tr key={order.id} className="hover:bg-admin-600/50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="font-mono font-medium text-gray-200">{order.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-300">{order.customerName}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-400">Masa {order.tableNumber}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-brand-400">{formatPrice(order.total)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${statusColor}`}>
                      {STATUS_LABELS[order.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-gray-500">{formatDateShort(order.createdAt)}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        id={`view-order-${order.id}`}
                        onClick={() => onViewDetails(order)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition-colors"
                      >
                        Detay
                      </button>
                      {transitions.map((nextStatus) => (
                        <button
                          key={nextStatus}
                          id={`order-${order.id}-to-${nextStatus}`}
                          onClick={() => onStatusChange(order.id, nextStatus)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            nextStatus === 'cancelled'
                              ? 'text-red-400 hover:bg-red-500/10'
                              : 'text-emerald-400 hover:bg-emerald-500/10'
                          }`}
                        >
                          {STATUS_LABELS[nextStatus]}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
