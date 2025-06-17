import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook để quản lý reminders và notifications
export const useReminders = () => {
  const [notificationPermission, setNotificationPermission] = useState('default');
  const timersRef = useRef(new Map()); // Lưu trữ các timer đang hoạt động

  // Request notification permission khi component mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      
      if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
        });
      }
    }
  }, []);

  // Cleanup tất cả timers khi component unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timerId) => {
        clearTimeout(timerId);
      });
      timers.clear();
    };
  }, []);

  // Hiển thị notification
  const showNotification = useCallback((title, options = {}) => {
    if ('Notification' in window && notificationPermission === 'granted') {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }, [notificationPermission]);

  // Thiết lập reminder cho một todo
  const setReminder = useCallback((todoId, reminderTime, todoText) => {
    if (!reminderTime) return;

    // Xóa timer cũ nếu có
    const existingTimer = timersRef.current.get(todoId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const reminderDate = new Date(reminderTime);
    const now = new Date();
    const timeUntilReminder = reminderDate.getTime() - now.getTime();

    // Chỉ set timer nếu thời gian reminder còn trong tương lai
    if (timeUntilReminder > 0) {
      const timerId = setTimeout(() => {
        showNotification(`🔔 Reminder: ${todoText}`, {
          body: 'Bạn cần hoàn thành công việc này!',
          tag: `todo-${todoId}`, // Tránh duplicate notifications
          requireInteraction: true
        });
        
        // Xóa timer sau khi đã thực hiện
        timersRef.current.delete(todoId);
      }, timeUntilReminder);

      timersRef.current.set(todoId, timerId);
    }
  }, [showNotification]);

  // Xóa reminder cho một todo
  const removeReminder = useCallback((todoId) => {
    const timerId = timersRef.current.get(todoId);
    if (timerId) {
      clearTimeout(timerId);
      timersRef.current.delete(todoId);
    }
  }, []);

  // Thiết lập tất cả reminders từ danh sách todos
  const initializeReminders = useCallback((todos) => {
    // Xóa tất cả timers hiện tại
    timersRef.current.forEach((timerId) => {
      clearTimeout(timerId);
    });
    timersRef.current.clear();

    // Thiết lập lại reminders cho các todos có reminderTime
    todos.forEach((todo) => {
      if (todo.reminderTime && !todo.completed) {
        setReminder(todo.id, todo.reminderTime, todo.text);
      }
    });
  }, [setReminder]);

  // Update reminder khi todo text thay đổi
  const updateReminder = useCallback((todoId, reminderTime, todoText) => {
    if (reminderTime) {
      setReminder(todoId, reminderTime, todoText);
    } else {
      removeReminder(todoId);
    }
  }, [setReminder, removeReminder]);

  return {
    notificationPermission,
    setReminder,
    removeReminder,
    initializeReminders,
    updateReminder,
    showNotification
  };
};