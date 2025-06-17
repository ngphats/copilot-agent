import React, { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { useDarkMode } from './hooks/useDarkMode';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo, clearCompleted } = useTodos();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Tính toán todos được lọc dựa trên filter và search term
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Lọc theo search term
    if (searchTerm.trim()) {
      result = result.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Lọc theo trạng thái
    switch (filter) {
      case 'active':
        return result.filter(todo => !todo.completed);
      case 'completed':
        return result.filter(todo => todo.completed);
      default:
        return result;
    }
  }, [todos, filter, searchTerm]);

  // Tính toán các số liệu thống kê
  const todoCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const hasCompleted = completedCount > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <TodoForm onAddTodo={addTodo} />
          
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onClearCompleted={clearCompleted}
            hasCompleted={hasCompleted}
          />
          
          <TodoFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            todoCount={todoCount}
            completedCount={completedCount}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          {searchTerm && (
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Tìm thấy {filteredTodos.length} kết quả cho "{searchTerm}"
            </div>
          )}
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>
        
        {todoCount > 0 && (
          <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
            💡 <strong>Mẹo:</strong> Double-click vào todo để chỉnh sửa nhanh
          </div>
        )}
      </div>
    </div>
  );
}

export default App;