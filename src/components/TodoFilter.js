import React from 'react';

const TodoFilter = ({ currentFilter, onFilterChange, todoCount, completedCount }) => {
  const filters = [
    { key: 'all', label: 'Tất cả', count: todoCount },
    { key: 'active', label: 'Đang làm', count: todoCount - completedCount },
    { key: 'completed', label: 'Hoàn thành', count: completedCount },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="flex gap-2">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`filter-button ${
              currentFilter === key ? 'active' : 'inactive'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {todoCount > 0 && (
          <span>
            {completedCount}/{todoCount} hoàn thành
          </span>
        )}
      </div>
    </div>
  );
};

export default TodoFilter;