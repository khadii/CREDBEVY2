import React, { useState, FC, JSX } from 'react';
import { X, FileText } from 'lucide-react';

type NotificationType =
  | 'loan-application'
  | 'pending-applications'
  | 'disbursement-success'
  | 'error'
  | 'account-update'
  | 'system-maintenance';

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  time: string;
};

type NotificationCategories = {
  [key: string]: Notification[];
};

const NotificationModal: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Transactions');

  const notifications: NotificationCategories = {
    'View All': [
      {
        id: 1,
        type: 'loan-application',
        title:
          'John Doe has submitted a loan application for ₦100,000. Please review and approve or reject the application as soon as possible.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 2,
        type: 'pending-applications',
        title:
          'You have two pending loan applications that require your attention. Please review the applications and respond as soon as possible.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 3,
        type: 'disbursement-success',
        title:
          'Your loan of ₦200,000 to Jane Smith has been successfully disbursed. Please log in to your account to view the transaction details.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 4,
        type: 'disbursement-success',
        title:
          'Your loan of ₦200,000 to Jane Smith has been successfully disbursed. Please view the transaction details.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 5,
        type: 'error',
        title:
          'We regret to inform you that there was an error processing the disbursement of your loan to John Doe. Please review the details and contact us if you have any questions.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 6,
        type: 'error',
        title:
          'We regret to inform you that there was an error processing the disbursement of your loan to John Doe. Please review the details and contact us if you have any questions.',
        time: '04 Apr 2023, 2:30 PM',
      },
    ],
    Request: [
      {
        id: 1,
        type: 'loan-application',
        title:
          'John Doe has submitted a loan application for ₦100,000. Please review and approve or reject the application as soon as possible.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 2,
        type: 'pending-applications',
        title:
          'You have two pending loan applications that require your attention. Please review the applications and respond as soon as possible.',
        time: '04 Apr 2023, 2:30 PM',
      },
    ],
    Transactions: [
      {
        id: 3,
        type: 'disbursement-success',
        title:
          'Your loan of ₦200,000 to Jane Smith has been successfully disbursed. Please log in to your account to view the transaction details.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 4,
        type: 'disbursement-success',
        title:
          'Your loan of ₦200,000 to Jane Smith has been successfully disbursed. Please view the transaction details.',
        time: '04 Apr 2023, 2:30 PM',
      },
      {
        id: 5,
        type: 'error',
        title:
          'We regret to inform you that there was an error processing the disbursement of your loan to John Doe. Please review the details and contact us if you have any questions.',
        time: '04 Apr 2023, 2:30 PM',
      },
    ],
    Accounts: [
      {
        id: 7,
        type: 'account-update',
        title:
          'Your account information has been successfully updated. Please verify the changes in your profile settings.',
        time: '04 Apr 2023, 1:15 PM',
      },
    ],
    Others: [
      {
        id: 8,
        type: 'system-maintenance',
        title:
          'Scheduled system maintenance will occur on April 6th from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.',
        time: '03 Apr 2023, 10:00 AM',
      },
    ],
  };

  const tabs: string[] = ['View All', 'Request', 'Transactions', 'Accounts', 'Others'];

  const getNotificationIcon = (type: NotificationType): JSX.Element => {
    return (
      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
        <FileText className="w-5 h-5 text-teal-600" />
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="p-8">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Open Notifications
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Notification</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4">
          <div className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  activeTab === tab
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
   <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {notifications[activeTab]?.map((notification) => (
              <div
                key={notification.id}
                className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {getNotificationIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-sm leading-relaxed mb-2">
                    {notification.title}
                  </p>
                  <p className="text-gray-400 text-xs">{notification.time}</p>
                </div>
              </div>
            ))}
            {(!notifications[activeTab] || notifications[activeTab].length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No notifications in this category
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
