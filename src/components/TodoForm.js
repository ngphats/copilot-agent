import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Thêm công việc mới..."
          className="todo-input flex-1"
          autoFocus
        />
        <button
          type="submit"
          className="todo-button px-6"
          disabled={!inputValue.trim()}
        >
          Thêm
        </button>
      </div>
    </form>
  );
};

export default TodoForm;