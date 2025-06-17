import React, { useState, useRef, useEffect } from 'react';

const TodoItem = ({ todo, onToggle, onDelete, onUpdate, onUpdateReminder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const [isEditingReminder, setIsEditingReminder] = useState(false);
  const [editReminderValue, setEditReminderValue] = useState(
    todo.reminderTime ? new Date(todo.reminderTime).toISOString().slice(0, 16) : ''
  );
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

  const handleEditReminder = () => {
    setIsEditingReminder(true);
    setEditReminderValue(
      todo.reminderTime ? new Date(todo.reminderTime).toISOString().slice(0, 16) : ''
    );
  };

  const handleSaveReminder = () => {
    const reminderTime = editReminderValue || null;
    
    // Validate reminder time if provided
    if (reminderTime) {
      const reminderDate = new Date(reminderTime);
      const now = new Date();
      
      if (reminderDate <= now) {
        alert('Thời gian nhắc nhở phải là thời điểm trong tương lai!');
        return;
      }
    }
    
    onUpdateReminder(todo.id, reminderTime);
    setIsEditingReminder(false);
  };

  const handleCancelReminder = () => {
    setEditReminderValue(
      todo.reminderTime ? new Date(todo.reminderTime).toISOString().slice(0, 16) : ''
    );
    setIsEditingReminder(false);
  };

  // Tạo giá trị min cho datetime input (hiện tại)
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Format thời gian hiển thị
  const formatReminderTime = (reminderTime) => {
    if (!reminderTime) return '';
    const date = new Date(reminderTime);
    return date.toLocaleString('vi-VN');
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
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span
                className={`cursor-pointer ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
                onDoubleClick={handleEdit}
              >
                {todo.text}
              </span>
              {todo.reminderTime && (
                <span 
                  className="text-primary-600 cursor-pointer" 
                  title={`Nhắc nhở: ${formatReminderTime(todo.reminderTime)}`}
                  onClick={handleEditReminder}
                >
                  🔔
                </span>
              )}
            </div>
            
            {/* Hiển thị thời gian reminder nếu có */}
            {todo.reminderTime && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ⏰ {formatReminderTime(todo.reminderTime)}
              </div>
            )}

            {/* Inline editing cho reminder */}
            {isEditingReminder && (
              <div className="mt-2 p-2 border rounded bg-gray-50 dark:bg-gray-700">
                <div className="flex gap-2 items-center">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    🔔 Nhắc nhở:
                  </label>
                  <input
                    type="datetime-local"
                    value={editReminderValue}
                    onChange={(e) => setEditReminderValue(e.target.value)}
                    min={getMinDateTime()}
                    className="todo-input flex-1 text-sm"
                  />
                  <button
                    onClick={handleSaveReminder}
                    className="todo-button-secondary text-sm hover:bg-green-200 hover:text-green-700"
                    title="Lưu"
                  >
                    ✅
                  </button>
                  <button
                    onClick={handleCancelReminder}
                    className="todo-button-secondary text-sm hover:bg-red-200 hover:text-red-700"
                    title="Hủy"
                  >
                    ❌
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        {!isEditing && !isEditingReminder && (
          <>
            <button
              onClick={handleEdit}
              className="todo-button-secondary text-sm"
              title="Chỉnh sửa (double-click)"
            >
              ✏️
            </button>
            <button
              onClick={handleEditReminder}
              className="todo-button-secondary text-sm"
              title="Thiết lập nhắc nhở"
            >
              🔔
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