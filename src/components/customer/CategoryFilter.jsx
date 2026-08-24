export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          id={`category-${category}`}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-brand-400 text-white shadow-md'
              : 'bg-white text-earth-500 border border-cream-300 hover:border-brand-300 hover:text-brand-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
