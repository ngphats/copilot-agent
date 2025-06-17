import React, { useState, useRef, useEffect } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef(null);

  // Focus input khi bắt đầu edit
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(todo.text);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue.trim() !== todo.text) {
      onUpdate(todo.id, editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="flex items-center flex-1 gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
        />
        
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:border-primary-500"
          />
        ) : (
          <span
            className={`flex-1 cursor-pointer ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
            onDoubleClick={handleEdit}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {!isEditing && (
          <>
            <button
              onClick={handleEdit}
              className="todo-button-secondary text-sm"
              title="Chỉnh sửa (double-click)"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="todo-button-secondary text-sm hover:bg-red-200 hover:text-red-700"
              title="Xóa"
            >
              🗑️
            </button>
          </>
        )}
        
        {isEditing && (
          <>
            <button
              onClick={handleSave}
              className="todo-button-secondary text-sm hover:bg-green-200 hover:text-green-700"
              title="Lưu"
            >
              ✅
            </button>
            <button
              onClick={handleCancel}
              className="todo-button-secondary text-sm hover:bg-red-200 hover:text-red-700"
              title="Hủy"
            >
              ❌
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;