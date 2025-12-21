import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faGamepad, faCalendarAlt, faStar, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Cyberpunk 2077 Update",
      message: "New DLC 'Phantom Liberty' is now available!",
      type: "release",
      game: "Cyberpunk 2077",
      timestamp: "10 minutes ago",
      read: false,
      icon: "🎮"
    },
    {
      id: 2,
      title: "Your Wishlist Game",
      message: "Starfield is now available for pre-order",
      type: "wishlist",
      game: "Starfield",
      timestamp: "2 hours ago",
      read: false,
      icon: "⭐"
    },
    {
      id: 3,
      title: "Price Drop Alert",
      message: "The Witcher 3: Wild Hunt is 60% off on Steam",
      type: "sale",
      game: "The Witcher 3",
      timestamp: "1 day ago",
      read: true,
      icon: "🔥"
    },
    {
      id: 4,
      title: "Friend Activity",
      message: "Alex started playing Elden Ring",
      type: "friend",
      game: "Elden Ring",
      timestamp: "2 days ago",
      read: true,
      icon: "👥"
    },
    {
      id: 5,
      title: "Upcoming Release",
      message: "Marvel's Spider-Man 2 releases in 3 days",
      type: "reminder",
      game: "Spider-Man 2",
      timestamp: "3 days ago",
      read: true,
      icon: "📅"
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Calculate unread notifications
  useEffect(() => {
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Mark single notification as read
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get notification type color
  const getTypeColor = (type) => {
    const colors = {
      release: "from-cyan-600 to-blue-600",
      wishlist: "from-yellow-600 to-orange-600",
      sale: "from-green-600 to-emerald-600",
      friend: "from-purple-600 to-pink-600",
      reminder: "from-red-600 to-pink-600"
    };
    return colors[type] || "from-gray-600 to-gray-700";
  };

  // Get notification type icon
  const getTypeIcon = (type) => {
    const icons = {
      release: faGamepad,
      wishlist: faStar,
      sale: "🔥",
      friend: "👥",
      reminder: faCalendarAlt
    };
    return icons[type] || faBell;
  };

  return (
    <>
      {/* Notification Bell Icon */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-cyan-500/50 transition-all duration-300 group"
        >
          <FontAwesomeIcon 
            icon={faBell} 
            className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" 
          />
          
          {/* Unread Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-red-500 rounded-full opacity-75"></div>
                <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              </div>
            </div>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 top-full mt-2 w-96 z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl">
                      <FontAwesomeIcon icon={faBell} className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">Notifications</h3>
                      <p className="text-gray-400 text-sm">
                        {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={markAllAsRead}
                      disabled={unreadCount === 0}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        unreadCount === 0 
                          ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-600/30 to-cyan-600/30 text-cyan-400 hover:from-blue-600/50 hover:to-cyan-600/50'
                      }`}
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={clearAllNotifications}
                      className="px-3 py-1 rounded-lg text-sm bg-gradient-to-r from-red-600/30 to-pink-600/30 text-red-400 hover:from-red-600/50 hover:to-pink-600/50"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-4xl mb-4">🔔</div>
                    <p className="text-gray-400">No notifications yet</p>
                    <p className="text-gray-500 text-sm mt-2">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-white/5 transition-colors duration-200 ${
                          !notification.read ? 'bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Notification Icon */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r ${getTypeColor(notification.type)} flex items-center justify-center`}>
                            <span className="text-white text-lg">
                              {typeof getTypeIcon(notification.type) === 'string' 
                                ? getTypeIcon(notification.type) 
                                : <FontAwesomeIcon icon={getTypeIcon(notification.type)} className="h-4 w-4" />
                              }
                            </span>
                          </div>

                          {/* Notification Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-white font-bold truncate">
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-gray-500 hover:text-red-400 transition-colors"
                                >
                                  <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-gray-300 text-sm mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {notification.game && (
                                  <span className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-gray-300">
                                    {notification.game}
                                  </span>
                                )}
                                <span className="text-gray-500 text-xs">
                                  {notification.timestamp}
                                </span>
                              </div>
                              
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                                >
                                  <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" />
                                  Mark read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Close
                  </button>
                  <a
                    href="#"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm rounded-lg text-cyan-400 hover:text-white transition-colors text-sm"
                  >
                    View All Notifications
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default Notifications;