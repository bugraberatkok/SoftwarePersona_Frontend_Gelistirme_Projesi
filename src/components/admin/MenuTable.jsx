import { formatPrice } from '../../utils/formatters';

export default function MenuTable({ items, onEdit, onDelete, onToggleAvailability }) {
  if (items.length === 0) {
    return (
      <div className="admin-card p-12 text-center">
        <p className="text-4xl mb-4">🍽️</p>
        <p className="text-gray-400 text-lg">Henüz menü ürünü eklenmemiş.</p>
        <p className="text-gray-500 text-sm mt-2">Yukarıdaki butona tıklayarak ilk ürünü ekleyin.</p>
      </div>
    );
  }

  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-admin-500">
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ürün</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fiyat</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
              <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-600">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-admin-600/50 transition-colors">
                {/* Item info */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-200 truncate max-w-[200px]">{item.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-400">{item.category}</span>
                </td>

                {/* Price */}
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-brand-400">{formatPrice(item.price)}</span>
                </td>

                {/* Availability toggle */}
                <td className="px-5 py-4">
                  <button
                    id={`toggle-availability-${item.id}`}
                    onClick={() => onToggleAvailability(item.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      item.available ? 'bg-emerald-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.available ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </td>

                {/* Actions */}
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      id={`edit-item-${item.id}`}
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 hover:bg-blue-500/10 transition-colors"
                    >
                      Düzenle
                    </button>
                    <button
                      id={`delete-item-${item.id}`}
                      onClick={() => onDelete(item)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
