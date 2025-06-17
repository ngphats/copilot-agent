import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearCompleted, hasCompleted }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Tìm kiếm công việc..."
        className="todo-input flex-1"
      />
      
      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="todo-button-secondary hover:bg-red-200 hover:text-red-700 whitespace-nowrap"
        >
          Xóa đã hoàn thành
        </button>
      )}
    </div>
  );
};

export default SearchBar;