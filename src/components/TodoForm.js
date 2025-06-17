import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      let validReminderTime = reminderTime || null;
      
      // Validate reminder time if provided
      if (reminderTime) {
        const reminderDate = new Date(reminderTime);
        const now = new Date();
        
        if (reminderDate <= now) {
          alert('Thời gian nhắc nhở phải là thời điểm trong tương lai!');
          return;
        }
        validReminderTime = reminderTime;
      }
      
      onAddTodo(inputValue, validReminderTime);
      setInputValue('');
      setReminderTime('');
    }
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

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="space-y-3">
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
        
        <div className="flex gap-3 items-center">
          <label htmlFor="reminderTime" className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            🔔 Nhắc nhở:
          </label>
          <input
            id="reminderTime"
            type="datetime-local"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            min={getMinDateTime()}
            className="todo-input flex-1"
            title="Chọn thời gian nhắc nhở (tùy chọn)"
          />
          {reminderTime && (
            <button
              type="button"
              onClick={() => setReminderTime('')}
              className="todo-button-secondary text-sm"
              title="Xóa nhắc nhở"
            >
              ❌
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TodoForm;