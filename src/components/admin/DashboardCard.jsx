export default function DashboardCard({ title, value, subtitle, icon, color }) {
  const colorMap = {
    brand:   'border-brand-400/30 text-brand-400',
    blue:    'border-blue-400/30 text-blue-400',
    amber:   'border-amber-400/30 text-amber-400',
    emerald: 'border-emerald-400/30 text-emerald-400',
    gray:    'border-gray-400/30 text-gray-400',
  };

  const borderColor = colorMap[color] || colorMap.brand;

  return (
    <div className={`admin-card p-5 border-l-4 ${borderColor} animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-100 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
