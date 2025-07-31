import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';

import { selectAllNotifications, selectMarkAsReadLoading, selectNotificationsLoading, selectUnreadCount } from '@/app/Redux/Notification/Notification';
import { fetchAllNotifications, markNotificationAsRead } from '@/app/Redux/Notification/NotificationsThunk';
import { AppDispatch } from '@/app/Redux/store';

// MessageDetailModal Component
const MessageDetailModal = ({ isOpen, message, onClose }: { isOpen: boolean, message: string, onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
  
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !message) {
    return null;
  }

  return (
  
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 font-sans z-[70]">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold text-[#333333]">Message Details</h3> 
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            aria-label="Close message view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1">
          <div
            className="text-sm leading-relaxed text-[#333333]"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        </div>

        {/* Modal Footer */}
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#156064] text-white rounded-md hover:bg-[#104e52] focus:outline-none focus:ring-2 focus:ring-[#156064]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


const App = ({ isNotificationsModalOpen, setIsNotificationsModalOpen }: { isNotificationsModalOpen: boolean, setIsNotificationsModalOpen: (isOpen: boolean) => void }) => {
  const [activeTab, setActiveTab] = useState('View All');
  const [isMessageDetailModalOpen, setIsMessageDetailModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const notifications = useSelector(selectAllNotifications);
  const unreadCount = useSelector(selectUnreadCount);
  const isLoading = useSelector(selectNotificationsLoading);
  const isMarkingAsRead = useSelector(selectMarkAsReadLoading); 

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Only close if the click is outside the modal AND the message detail modal is NOT open
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && !isMessageDetailModalOpen) {
        setIsNotificationsModalOpen(false);
      }
    };

    if (isNotificationsModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isNotificationsModalOpen, setIsNotificationsModalOpen, isMessageDetailModalOpen]); 

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, [dispatch]);


  const filteredNotifications = notifications?.filter(notification => {
    switch (activeTab) {
      case 'View All': return true;
      case 'Request': return notification.type === 'request';
      case 'Transactions': return notification.type === 'transactions';
      case 'Accounts': return notification.type === 'accounts';
      case 'Others': return notification.type === 'others';
      default: return false;
    }
  });


  const handleNotificationClick = (notificationId: string, isRead: boolean, messageContent: string) => {
    if (!isRead) {
      dispatch(markNotificationAsRead(notificationId));
    }
    setSelectedMessage(messageContent);
    setIsMessageDetailModalOpen(true);
  };

  const handleCloseMessageDetailModal = () => {
    setIsMessageDetailModalOpen(false);
    setSelectedMessage('');
  };

  if (!isNotificationsModalOpen) {
    return null;
  }

  return (
    <>
   
      <div className="fixed inset-0 flex justify-end items-start p-4 pt-14 font-sans z-50 pointer-events-none">
        <div ref={modalRef} className="bg-white rounded-lg w-full max-w-[480px] overflow-hidden flex flex-col h-[90vh] md:h-[80vh] shadow-lg pointer-events-auto mt-4 mr-4">

          {/* Modal Header */}
          <div className="flex justify-between items-center p-4">
            <h2 className="text-base font-semibold text-[#333333]">
              Notification {unreadCount > 0 && `(${unreadCount})`}
            </h2>
            <button
              onClick={() => setIsNotificationsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto whitespace-nowrap space-x-[41px] px-4">
            {['View All', 'Request', 'Transactions', 'Accounts', 'Others'].map(tab => (
              <button
                key={tab}
                className={`pt-3 pb-[30px] text-xs font-semibold focus:outline-none transition-colors duration-200 ease-in-out
                  ${activeTab === tab
                    ? 'text-[#156064]'
                    : 'text-[#8A8B9F]'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notification List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#156064]"></div>
              </div>
            ) : filteredNotifications?.length > 0 ? (
              filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-6 p-3 cursor-pointer rounded-lg transition-colors duration-200
                    ${!notification.read_at ? 'bg-[#F7F7F7]' : 'bg-white'}
                    hover:bg-[#F0F0F0]`}
                  onClick={() => handleNotificationClick(notification.id, !!notification.read_at, notification.data.message)}
                >
                  {/* Icon - Different icons based on notification type */}
                  <div className="flex-shrink-0">
                    {notification.type === 'accounts' ? (
                      <Image src="/notificationTwo.svg" width={30} height={30} alt="Accounts Notification" />
                    ) : (
                      <Image src="/NotificationOne.svg" width={30} height={30} alt="General Notification" />
                    )}
                  </div>

                  {/* Notification Content (Truncated for main list) */}
                  <div className="flex-1 overflow-hidden">
                    <div className={`text-xs leading-relaxed ${!notification.read_at ? 'font-medium' : 'font-normal'} truncate`}>
                      <span dangerouslySetInnerHTML={{ __html: notification.data.message }} />
                    </div>
                    <p className="text-[10px] font-bold text-[#8A8B9F] mt-2">
                      {new Date(notification.created_at).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  {/* Unread indicator */}
                  {!notification.read_at && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#156064] mt-1"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 p-8">
                No notifications for this category.
              </div>
            )}
          </div>
        </div>
      </div>

  
      <MessageDetailModal
        isOpen={isMessageDetailModalOpen}
        message={selectedMessage}
        onClose={handleCloseMessageDetailModal}
      />
    </>
  );
};

export default App;