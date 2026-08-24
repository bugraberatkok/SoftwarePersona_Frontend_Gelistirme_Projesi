import { useState } from 'react';
import { useMenu } from '../../hooks/useMenu';
import MenuTable from '../../components/admin/MenuTable';
import MenuForm from '../../components/admin/MenuForm';
import ConfirmDialog from '../../components/common/ConfirmDialog';

export default function MenuManagementPage() {
  const { menuItems, createItem, updateItem, deleteItem, toggleAvailability } = useMenu();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const handleCreate = () => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData) => {
    if (editingItem) {
      updateItem(editingItem.id, formData);
    } else {
      createItem(formData);
    }
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      deleteItem(deletingItem.id);
      setDeletingItem(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="admin-page-title">Menü Yönetimi</h1>
          <p className="text-gray-500 mt-2">{menuItems.length} ürün</p>
        </div>
        <button
          id="add-menu-item-btn"
          onClick={handleCreate}
          className="btn-primary"
        >
          + Yeni Ürün Ekle
        </button>
      </div>

      <MenuTable
        items={menuItems}
        onEdit={handleEdit}
        onDelete={(item) => setDeletingItem(item)}
        onToggleAvailability={toggleAvailability}
      />

      {/* Create/Edit form modal */}
      {isFormOpen && (
        <MenuForm
          item={editingItem}
          onSubmit={handleFormSubmit}
          onClose={() => { setIsFormOpen(false); setEditingItem(null); }}
        />
      )}

      {/* Delete confirmation */}
      {deletingItem && (
        <ConfirmDialog
          title="Ürünü Sil"
          message={`"${deletingItem.name}" ürününü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
          confirmLabel="Sil"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingItem(null)}
          variant="danger"
        />
      )}
    </div>
  );
}
