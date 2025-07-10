import React, { useState } from 'react';

// Main App component
const App = () => {
  const [activeTab, setActiveTab] = useState('View All');
  const [isModalOpen, setIsModalOpen] = useState(true); // Control modal visibility

  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: 'request',
      text: 'John Doe has submitted a loan application for N100,000. Please review and approve or reject the application as soon as possible.',
      date: '04 Apr 2023, 2:30 PM',
    },
    {
      id: 2,
      type: 'request',
      text: 'You have two pending loan applications that require your attention. Please review the applications and respond as soon as possible.',
      date: '04 Apr 2023, 2:30 PM',
    },
    {
      id: 3,
      type: 'transaction',
      text: 'Your loan of N200,000 to Jane Smith has been successfully disbursed. Please log in to your account to view the transaction details.',
      date: '04 Apr 2023, 2:30 PM',
    },
    {
      id: 4,
      type: 'transaction',
      text: 'Your loan of N200,000 to Jane Smith has been successfully disbursed. Please view the transaction details.',
      date: '04 Apr 2023, 2:30 PM',
    },
    {
      id: 5,
      type: 'error',
      text: 'We regret to inform you that there was an error processing the disbursement of your loan to John Doe. Please review the details and contact us if you have any questions.',
      date: '04 Apr 2023, 2:30 PM',
    },
    {
      id: 6,
      type: 'error',
      text: 'We regret to inform you that there was an error processing the disbursement of your loan to John Doe. Please review the details and contact us if you have any questions.',
      date: '04 Apr 2023, 2:30 PM',
    },
  ];

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case 'View All':
        return true;
      case 'Request':
        return notification.type === 'request';
      case 'Transactions':
        return notification.type === 'transaction';
      default:
        return false; // For 'Accounts' and 'Others'
    }
  });

  if (!isModalOpen) {
    return null; // Don't render anything if the modal is closed
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4 font-sans z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden flex flex-col h-[90vh] md:h-[80vh]">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Notification</h2>
          <button
            onClick={() => setIsModalOpen(false)}
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
        <div className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap">
          {['View All', 'Request', 'Transactions', 'Accounts', 'Others'].map(tab => (
            <button
              key={tab}
              className={`py-3 px-4 text-sm font-medium focus:outline-none transition-colors duration-200 ease-in-out
                ${activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-100 shadow-sm"
              >
                {/* Icon */}
                <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                {/* Notification Text */}
                <div className="flex-1">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {notification.text.split(' ').map((word, index) => {
                      // Apply bold to specific keywords like "loan application", "pending loan applications", "successfully disbursed", "error processing"
                      const boldKeywords = ['loan application', 'pending loan applications', 'successfully disbursed', 'error processing'];
                      const isBold = boldKeywords.some(keyword => notification.text.includes(keyword) && notification.text.indexOf(keyword) <= notification.text.indexOf(word) && notification.text.indexOf(keyword) + keyword.length >= notification.text.indexOf(word) + word.length);

                      // A more robust way to bold specific phrases without splitting words
                      if (index === 0) { // Only process once per notification to avoid re-rendering issues
                        let formattedText = notification.text;
                        boldKeywords.forEach(keyword => {
                          const regex = new RegExp(`(${keyword})`, 'gi');
                          formattedText = formattedText.replace(regex, '<strong class="font-semibold">$&</strong>');
                        });
                        return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
                      }
                      return null; // Render only the first part to avoid duplication
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                </div>
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
  );
};

export default App;