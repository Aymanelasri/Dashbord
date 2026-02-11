import React, { useState, useEffect } from 'react';
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(dataService.getNotifications());
  }, []);

  const markAsRead = (id) => {
    dataService.markNotificationAsRead(id);
    setNotifications(dataService.getNotifications());
  };

  const markAllAsRead = () => {
    dataService.markAllNotificationsAsRead();
    setNotifications(dataService.getNotifications());
  };

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircleIcon className="text-success" style={{width: '24px', height: '24px'}} />;
      case 'warning': return <ExclamationCircleIcon className="text-warning" style={{width: '24px', height: '24px'}} />;
      default: return <InformationCircleIcon className="text-info" style={{width: '24px', height: '24px'}} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold mb-1">Notifications</h1>
          <p className="text-muted mb-0">You have {unreadCount} unread notifications</p>
        </div>
        <button className="btn btn-outline-primary" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <BellIcon className="text-primary me-3" style={{width: '32px', height: '32px'}} />
                <div>
                  <h6 className="text-muted small mb-1">Total</h6>
                  <h3 className="fw-bold mb-0">{notifications.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                  <BellIcon className="text-danger" style={{width: '24px', height: '24px'}} />
                </div>
                <div>
                  <h6 className="text-muted small mb-1">Unread</h6>
                  <h3 className="fw-bold mb-0">{unreadCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                  <CheckCircleIcon className="text-success" style={{width: '24px', height: '24px'}} />
                </div>
                <div>
                  <h6 className="text-muted small mb-1">Read</h6>
                  <h3 className="fw-bold mb-0">{notifications.length - unreadCount}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 border-bottom ${!notification.read ? 'bg-light' : ''}`}
              style={{cursor: 'pointer'}}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="d-flex">
                <div className="me-3">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-fill">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="mb-0 fw-semibold">{notification.title}</h6>
                    <small className="text-muted">{notification.time}</small>
                  </div>
                  <p className="mb-0 text-muted small">{notification.message}</p>
                  {notification.userId && (
                    <small className="text-info">User ID: {notification.userId}</small>
                  )}
                  {notification.orderId && (
                    <small className="text-success ms-2">Order ID: {notification.orderId}</small>
                  )}
                  {notification.productId && (
                    <small className="text-warning ms-2">Product ID: {notification.productId}</small>
                  )}
                  {!notification.read && (
                    <span className="badge bg-primary mt-2">New</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
