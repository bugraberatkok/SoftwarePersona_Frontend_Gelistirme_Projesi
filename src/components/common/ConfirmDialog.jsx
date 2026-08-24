export default function ConfirmDialog({ title, message, confirmLabel, onConfirm, onCancel, variant = 'danger' }) {
  const confirmBtnClass = variant === 'danger' ? 'btn-danger' : 'btn-primary';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fade-in">
      <div className="w-full max-w-md bg-admin-600 rounded-xl shadow-2xl border border-admin-500 animate-scale-in">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">
              {variant === 'danger' ? '⚠️' : 'ℹ️'}
            </span>
            <h3 className="text-lg font-bold text-gray-100">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-admin-500">
          <button
            id="confirm-dialog-cancel"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-admin-500 transition-colors"
          >
            İptal
          </button>
          <button
            id="confirm-dialog-confirm"
            onClick={onConfirm}
            className={`${confirmBtnClass} py-2 px-4 text-sm`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
