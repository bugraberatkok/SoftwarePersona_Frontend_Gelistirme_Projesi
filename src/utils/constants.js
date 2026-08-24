// Menu categories — Turkish names
export const CATEGORIES = [
  'Kebaplar',
  'Pideler',
  'Mezeler',
  'Çorbalar',
  'Tatlılar',
  'İçecekler',
];

// English translations for reference / tooltips
export const CATEGORY_TRANSLATIONS = {
  'Kebaplar': 'Kebabs',
  'Pideler':  'Pides',
  'Mezeler':  'Mezes',
  'Çorbalar': 'Soups',
  'Tatlılar': 'Desserts',
  'İçecekler': 'Beverages',
};

// Order status flow
export const ORDER_STATUSES = ['new', 'preparing', 'ready', 'completed', 'cancelled'];

export const STATUS_LABELS = {
  new:        'Yeni',
  preparing:  'Hazırlanıyor',
  ready:      'Hazır',
  completed:  'Tamamlandı',
  cancelled:  'İptal Edildi',
};

export const STATUS_COLORS = {
  new:        'bg-blue-100 text-blue-700',
  preparing:  'bg-amber-100 text-amber-700',
  ready:      'bg-emerald-100 text-emerald-700',
  completed:  'bg-gray-100 text-gray-600',
  cancelled:  'bg-red-100 text-red-700',
};

// Admin status colors (dark theme)
export const ADMIN_STATUS_COLORS = {
  new:        'bg-blue-500/20 text-blue-400',
  preparing:  'bg-amber-500/20 text-amber-400',
  ready:      'bg-emerald-500/20 text-emerald-400',
  completed:  'bg-gray-500/20 text-gray-400',
  cancelled:  'bg-red-500/20 text-red-400',
};

// Table numbers for dine-in
export const TABLE_NUMBERS = Array.from({ length: 10 }, (_, i) => i + 1);

// LocalStorage keys
export const STORAGE_KEYS = {
  MENU_ITEMS:   'altin_kebap_menu_items',
  ORDERS:       'altin_kebap_orders',
  CART:         'altin_kebap_cart',
  AUTH:         'altin_kebap_auth',
  INITIALIZED:  'altin_kebap_initialized',
  ORDER_COUNTER: 'altin_kebap_order_counter',
};

// Next valid statuses from current status
export const STATUS_TRANSITIONS = {
  new:       ['preparing', 'cancelled'],
  preparing: ['ready', 'cancelled'],
  ready:     ['completed'],
  completed: [],
  cancelled: [],
};
