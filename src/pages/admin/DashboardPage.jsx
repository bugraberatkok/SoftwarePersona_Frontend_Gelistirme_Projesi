import { useOrders } from '../../hooks/useOrders';
import { useMenu } from '../../hooks/useMenu';
import DashboardCard from '../../components/admin/DashboardCard';
import { formatPrice } from '../../utils/formatters';

export default function DashboardPage() {
  const { getStatistics } = useOrders();
  const { menuItems } = useMenu();
  const stats = getStatistics();

  const cards = [
    {
      title: 'Toplam Menü',
      value: menuItems.length,
      subtitle: 'ürün',
      icon: '🍽️',
      color: 'brand',
    },
    {
      title: 'Yeni Sipariş',
      value: stats.newOrders,
      subtitle: 'bekliyor',
      icon: '🔔',
      color: 'blue',
    },
    {
      title: 'Hazırlanıyor',
      value: stats.preparingOrders,
      subtitle: 'mutfakta',
      icon: '👨‍🍳',
      color: 'amber',
    },
    {
      title: 'Hazır',
      value: stats.readyOrders,
      subtitle: 'servise hazır',
      icon: '✅',
      color: 'emerald',
    },
    {
      title: 'Tamamlanan',
      value: stats.completedOrders,
      subtitle: 'sipariş',
      icon: '📦',
      color: 'gray',
    },
    {
      title: 'Toplam Gelir',
      value: formatPrice(stats.totalRevenue),
      subtitle: 'toplam ciro',
      icon: '💰',
      color: 'brand',
      isPrice: true,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="text-gray-500 mt-2">Restoran genel durumu</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
