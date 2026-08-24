import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useOrders } from '../../hooks/useOrders';
import CartItem from '../../components/customer/CartItem';
import CartSummary from '../../components/customer/CartSummary';
import { TABLE_NUMBERS } from '../../utils/constants';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearAllItems } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Lütfen adınızı girin.';
    }
    if (!tableNumber) {
      newErrors.tableNumber = 'Lütfen masa numarası seçin.';
    }
    if (items.length === 0) {
      newErrors.cart = 'Sepetiniz boş. Sipariş verebilmek için ürün ekleyin.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = createOrder({
      items: items.map(item => ({
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      customerName: customerName.trim(),
      tableNumber: Number(tableNumber),
    });

    clearAllItems();
    navigate(`/order/${order.id}`);
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="section bg-cream-50">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center py-16">
            <p className="text-6xl mb-6">🛒</p>
            <h2 className="text-earth-700 mb-4">Sepetiniz Boş</h2>
            <p className="text-earth-400 mb-8">
              Henüz sepetinize ürün eklemediniz. Menümüze göz atarak
              birbirinden lezzetli yemeklerimizi keşfedin.
            </p>
            <Link to="/menu" className="btn-primary">
              Menüye Git →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section bg-cream-50">
      <div className="container-custom">
        <h1 className="page-title mb-8">Sepetim</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.menuItemId}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Sidebar: summary + checkout form */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <CartSummary totalItems={totalItems} totalPrice={totalPrice} />

              <hr className="my-6 border-cream-200" />

              {/* Checkout form */}
              <form onSubmit={handlePlaceOrder}>
                <h3 className="text-lg font-heading font-semibold text-earth-700 mb-4">
                  Sipariş Bilgileri
                </h3>

                <div className="space-y-4">
                  {/* Customer name */}
                  <div>
                    <label htmlFor="customer-name" className="label">
                      Adınız
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      className={`input ${errors.customerName ? 'border-red-400 focus:ring-red-300' : ''}`}
                      placeholder="Adınızı girin"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                    {errors.customerName && (
                      <p className="input-error">{errors.customerName}</p>
                    )}
                  </div>

                  {/* Table number */}
                  <div>
                    <label htmlFor="table-number" className="label">
                      Masa Numarası
                    </label>
                    <select
                      id="table-number"
                      className={`select ${errors.tableNumber ? 'border-red-400 focus:ring-red-300' : ''}`}
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                    >
                      <option value="">Masa seçin</option>
                      {TABLE_NUMBERS.map((num) => (
                        <option key={num} value={num}>
                          Masa {num}
                        </option>
                      ))}
                    </select>
                    {errors.tableNumber && (
                      <p className="input-error">{errors.tableNumber}</p>
                    )}
                  </div>
                </div>

                {errors.cart && (
                  <p className="input-error mt-4">{errors.cart}</p>
                )}

                <button
                  id="place-order-btn"
                  type="submit"
                  className="btn-primary w-full mt-6 text-lg py-4"
                >
                  Sipariş Ver
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
