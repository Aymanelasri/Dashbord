import React, { useState, useEffect } from 'react';
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import dataService from '../services/dataService';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const allMessages = dataService.getMessages();
    setMessages(allMessages);
    if (allMessages.length > 0) {
      setSelectedMessage(allMessages[0]);
    }
  }, []);

  const unreadCount = messages.filter(m => m.unread).length;

  if (!selectedMessage) return <div className="p-4">No messages</div>;

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Messages</h1>
        <p className="text-muted mb-0">You have {unreadCount} unread messages</p>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0">
              <h6 className="mb-0 fw-semibold">Conversations</h6>
            </div>
            <div className="card-body p-0">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-3 border-bottom ${selectedMessage.id === msg.id ? 'bg-primary bg-opacity-10' : ''} ${msg.unread ? 'bg-light' : ''}`}
                  style={{cursor: 'pointer'}}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="d-flex align-items-center">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                      <span className="fw-bold small">{msg.avatar}</span>
                    </div>
                    <div className="flex-fill overflow-hidden">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <h6 className="mb-0 fw-semibold small">{msg.sender}</h6>
                        <small className="text-muted">{msg.time}</small>
                      </div>
                      <p className="mb-0 text-muted small text-truncate">{msg.message}</p>
                      {msg.user && (
                        <small className="text-info">Email: {msg.user.email}</small>
                      )}
                      {msg.orderId && (
                        <small className="text-success ms-2">Order #{msg.orderId}</small>
                      )}
                      {msg.unread && (
                        <span className="badge bg-danger mt-1">New</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card border-0 shadow-sm" style={{height: '600px', display: 'flex', flexDirection: 'column'}}>
            <div className="card-header bg-transparent border-0">
              <div className="d-flex align-items-center">
                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                  <span className="fw-bold">{selectedMessage.avatar}</span>
                </div>
                <div>
                  <h6 className="mb-0 fw-semibold">{selectedMessage.sender}</h6>
                  <small className="text-muted">Active now</small>
                </div>
              </div>
            </div>
            
            <div className="card-body flex-fill overflow-auto">
              <div className="mb-3">
                <div className="d-flex mb-3">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px', minWidth: '32px'}}>
                    <span className="fw-bold small">{selectedMessage.avatar}</span>
                  </div>
                  <div>
                    <div className="bg-light rounded p-3">
                      <p className="mb-0">{selectedMessage.message}</p>
                    </div>
                    <small className="text-muted">{selectedMessage.time}</small>
                  </div>
                </div>

                <div className="d-flex justify-content-end mb-3">
                  <div className="text-end">
                    <div className="bg-primary text-white rounded p-3">
                      <p className="mb-0">Thank you for reaching out! How can I help you today?</p>
                    </div>
                    <small className="text-muted">Just now</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer bg-transparent border-0">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="btn btn-primary">
                  <PaperAirplaneIcon style={{width: '20px', height: '20px'}} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
