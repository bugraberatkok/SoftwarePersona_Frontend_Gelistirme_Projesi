import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../utils/constants';

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  image: '',
  category: '',
  available: true,
  featured: false,
  spicy: false,
  preparationTime: '',
  calories: '',
  ingredients: '',
};

export default function MenuForm({ item, onSubmit, onClose }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const isEditing = !!item;

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        price: item.price?.toString() || '',
        image: item.image || '',
        category: item.category || '',
        available: item.available ?? true,
        featured: item.featured ?? false,
        spicy: item.spicy ?? false,
        preparationTime: item.preparationTime || '',
        calories: item.calories?.toString() || '',
        ingredients: item.ingredients || '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Ürün adı gerekli.';
    if (!formData.description.trim()) newErrors.description = 'Açıklama gerekli.';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Geçerli bir fiyat girin.';
    }
    if (!formData.image.trim()) newErrors.image = 'Görsel URL gerekli.';
    if (!formData.category) newErrors.category = 'Kategori seçin.';
    if (formData.calories && (isNaN(Number(formData.calories)) || Number(formData.calories) < 0)) {
      newErrors.calories = 'Geçerli bir kalori değeri girin.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...formData,
      price: Number(formData.price),
      calories: formData.calories ? Number(formData.calories) : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-admin-600 rounded-xl shadow-2xl border border-admin-500 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-admin-500">
          <h2 className="text-xl font-bold text-gray-100">
            {isEditing ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
          </h2>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="md:col-span-2">
              <label htmlFor="menu-item-name" className="block text-sm font-medium text-gray-400 mb-1.5">
                Ürün Adı *
              </label>
              <input
                id="menu-item-name"
                name="name"
                type="text"
                className="admin-input"
                placeholder="Ör: Adana Kebap"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label htmlFor="menu-item-description" className="block text-sm font-medium text-gray-400 mb-1.5">
                Açıklama *
              </label>
              <textarea
                id="menu-item-description"
                name="description"
                rows={3}
                className="admin-input resize-none"
                placeholder="Ürün açıklaması..."
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="menu-item-price" className="block text-sm font-medium text-gray-400 mb-1.5">
                Fiyat (₺) *
              </label>
              <input
                id="menu-item-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                className="admin-input"
                placeholder="285"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="menu-item-category" className="block text-sm font-medium text-gray-400 mb-1.5">
                Kategori *
              </label>
              <select
                id="menu-item-category"
                name="category"
                className="admin-input"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Kategori seçin</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label htmlFor="menu-item-image" className="block text-sm font-medium text-gray-400 mb-1.5">
                Görsel URL *
              </label>
              <input
                id="menu-item-image"
                name="image"
                type="url"
                className="admin-input"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={handleChange}
              />
              {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
              {formData.image && (
                <img src={formData.image} alt="Önizleme" className="mt-2 h-24 w-36 object-cover rounded-lg" />
              )}
            </div>

            {/* Preparation Time */}
            <div>
              <label htmlFor="menu-item-preptime" className="block text-sm font-medium text-gray-400 mb-1.5">
                Hazırlama Süresi
              </label>
              <input
                id="menu-item-preptime"
                name="preparationTime"
                type="text"
                className="admin-input"
                placeholder="15-20 dk"
                value={formData.preparationTime}
                onChange={handleChange}
              />
            </div>

            {/* Calories */}
            <div>
              <label htmlFor="menu-item-calories" className="block text-sm font-medium text-gray-400 mb-1.5">
                Kalori (kcal)
              </label>
              <input
                id="menu-item-calories"
                name="calories"
                type="number"
                min="0"
                className="admin-input"
                placeholder="450"
                value={formData.calories}
                onChange={handleChange}
              />
              {errors.calories && <p className="text-red-400 text-xs mt-1">{errors.calories}</p>}
            </div>

            {/* Ingredients */}
            <div className="md:col-span-2">
              <label htmlFor="menu-item-ingredients" className="block text-sm font-medium text-gray-400 mb-1.5">
                Malzemeler
              </label>
              <input
                id="menu-item-ingredients"
                name="ingredients"
                type="text"
                className="admin-input"
                placeholder="Kuzu kıyma, pul biber, kuyruk yağı, soğan"
                value={formData.ingredients}
                onChange={handleChange}
              />
            </div>

            {/* Toggles */}
            <div className="md:col-span-2 flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="available"
                  checked={formData.available}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-admin-400 text-brand-400 focus:ring-brand-400 bg-admin-700"
                />
                <span className="text-sm text-gray-300">Satışta</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-admin-400 text-brand-400 focus:ring-brand-400 bg-admin-700"
                />
                <span className="text-sm text-gray-300">Öne Çıkan</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="spicy"
                  checked={formData.spicy}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-admin-400 text-brand-400 focus:ring-brand-400 bg-admin-700"
                />
                <span className="text-sm text-gray-300">🌶️ Acılı</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-admin-500">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-admin-500 transition-colors"
            >
              İptal
            </button>
            <button
              id="menu-form-submit-btn"
              type="submit"
              className="btn-primary"
            >
              {isEditing ? 'Güncelle' : 'Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
