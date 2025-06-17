import React from 'react';

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="text-center mb-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400">
          📝 Todo App
        </h1>
        
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          title={isDarkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400">
        Quản lý công việc hàng ngày một cách đơn giản và hiệu quả
      </p>
    </header>
  );
};

export default Header;