import React from 'react';
import { useReminders } from '../hooks/useReminders';

const NotificationStatus = () => {
  const { notificationPermission, showNotification } = useReminders();

  const handleTestNotification = () => {
    showNotification('🔔 Test Reminder', {
      body: 'Thông báo nhắc nhở đang hoạt động!',
      tag: 'test-notification'
    });
  };

  const handleRequestPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          handleTestNotification();
        }
      });
    }
  };

  if (!('Notification' in window)) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
        <div className="flex items-center">
          <span className="text-yellow-600 dark:text-yellow-400 text-sm">
            ⚠️ Trình duyệt không hỗ trợ thông báo. Tính năng nhắc nhở sẽ không hoạt động.
          </span>
        </div>
      </div>
    );
  }

  switch (notificationPermission) {
    case 'granted':
      return (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-green-600 dark:text-green-400 text-sm">
              ✅ Thông báo đã được bật. Bạn sẽ nhận nhắc nhở khi đến thời gian.
            </span>
            <button
              onClick={handleTestNotification}
              className="todo-button-secondary text-xs"
            >
              Test thông báo
            </button>
          </div>
        </div>
      );
    
    case 'denied':
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <span className="text-red-600 dark:text-red-400 text-sm">
              ❌ Thông báo đã bị từ chối. Vui lòng bật thông báo trong cài đặt trình duyệt để nhận nhắc nhở.
            </span>
          </div>
        </div>
      );
    
    case 'default':
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-600 dark:text-blue-400 text-sm">
              🔔 Cho phép thông báo để nhận nhắc nhở công việc
            </span>
            <button
              onClick={handleRequestPermission}
              className="todo-button text-xs"
            >
              Bật thông báo
            </button>
          </div>
        </div>
      );
    
    default:
      return null;
  }
};

export default NotificationStatus;