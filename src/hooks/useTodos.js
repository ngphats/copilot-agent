import { useState, useEffect } from 'react';
import { useReminders } from './useReminders';

// Custom hook để quản lý todos với localStorage
export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const { initializeReminders, updateReminder, removeReminder } = useReminders();

  // Load todos từ localStorage khi component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
        // Khởi tạo reminders sau khi load todos
        initializeReminders(parsedTodos);
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
        setTodos([]);
      }
    }
  }, [initializeReminders]);

  // Lưu todos vào localStorage mỗi khi todos thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    // Cập nhật reminders khi todos thay đổi
    initializeReminders(todos);
  }, [todos, initializeReminders]);

  // Thêm todo mới
  const addTodo = (text, reminderTime = null) => {
    if (text.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      reminderTime: reminderTime
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  // Xóa todo
  const deleteTodo = (id) => {
    // Xóa reminder trước khi xóa todo
    removeReminder(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Toggle trạng thái hoàn thành
  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Cập nhật text của todo
  const updateTodo = (id, newText) => {
    if (newText.trim() === '') return;
    
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, text: newText.trim() };
          // Cập nhật reminder với text mới
          if (updatedTodo.reminderTime) {
            updateReminder(id, updatedTodo.reminderTime, updatedTodo.text);
          }
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  // Cập nhật reminder của todo
  const updateTodoReminder = (id, reminderTime) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          const updatedTodo = { ...todo, reminderTime };
          // Cập nhật hoặc xóa reminder
          updateReminder(id, reminderTime, updatedTodo.text);
          return updatedTodo;
        }
        return todo;
      })
    );
  };

  // Xóa tất cả todos đã hoàn thành
  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    updateTodoReminder,
    clearCompleted,
  };
};