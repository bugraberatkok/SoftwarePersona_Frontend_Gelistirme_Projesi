import { STATUS_LABELS, STATUS_COLORS } from '../../utils/constants';

export default function StatusBadge({ status, variant = 'customer' }) {
  const label = STATUS_LABELS[status] || status;
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-600';

  return (
    <span className={`badge ${colorClass}`}>
      {label}
    </span>
  );
}
