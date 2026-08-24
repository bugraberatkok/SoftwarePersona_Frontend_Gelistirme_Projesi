import { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import OrderTable from '../../components/admin/OrderTable';
import OrderDetailsModal from '../../components/admin/OrderDetailsModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function OrderManagementPage() {
  const { orders, updateStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === 'cancelled') {
      setCancellingOrder(orders.find(o => o.id === orderId));
    } else {
      updateStatus(orderId, newStatus);
    }
  };

  const handleCancelConfirm = () => {
    if (cancellingOrder) {
      updateStatus(cancellingOrder.id, 'cancelled');
      setCancellingOrder(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="admin-page-title">Sipariş Yönetimi</h1>
        <p className="text-gray-500 mt-2">{orders.length} sipariş</p>
      </div>

      <OrderTable
        orders={orders}
        onStatusChange={handleStatusChange}
        onViewDetails={(order) => setSelectedOrder(order)}
      />

      {/* Order details modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Cancel confirmation */}
      {cancellingOrder && (
        <ConfirmDialog
          title="Siparişi İptal Et"
          message={`${cancellingOrder.id} numaralı siparişi iptal etmek istediğinizden emin misiniz?`}
          confirmLabel="İptal Et"
          onConfirm={handleCancelConfirm}
          onCancel={() => setCancellingOrder(null)}
          variant="danger"
        />
      )}
    </div>
  );
}
