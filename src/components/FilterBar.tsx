import clsx from 'clsx';
import { FilterType } from '@/types/index';
import { Trash2 } from 'lucide-react';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition',
              filter === f.value
                ? 'bg-indigo-600 text-white shadow'
                : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition"
          aria-label="Clear completed"
        >
          <Trash2 size={14} />
          Clear completed
        </button>
      )}
    </div>
  );
}
