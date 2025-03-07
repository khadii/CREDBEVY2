"use client";

import { useState } from "react";
import ToggleButton from "../FormInputs/ToggleButton";


export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    desktopNotification: true,
    unreadBadge: true,
    communicationEmails: true,
    announcements: false,
    disableSound: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <div className="max-w-[700px] h-screen">
      <div className="space-y-8">
        {/* Desktop Notification */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Enable Desktop Notification</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">
              Receive notification from all loan requests, repayments etc.
            </p>
          </div>
          
          <ToggleButton
            isEnabled={settings.desktopNotification}
            onToggle={() => handleToggle("desktopNotification")}
          />
        </div>

        {/* Unread Notification Badge */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Enable Unread Notification Badge</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">
              Show a red icon when notifications are unread
            </p>
          </div>
        
          <ToggleButton
            isEnabled={settings.unreadBadge}
            onToggle={() => handleToggle("unreadBadge")}
          />
        </div>

        {/* Communication Emails */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Communication Emails</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">
              Receive emails for Loan requests, repayment etc.
            </p>
          </div>
      
          <ToggleButton
            isEnabled={settings.communicationEmails}
            onToggle={() => handleToggle("communicationEmails")}
          />
        </div>

        {/* Announcements & Updates */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Announcements & Updates</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">
              Receive announcements for our products and services.
            </p>
          </div>
          
          <ToggleButton
            isEnabled={settings.announcements}
            onToggle={() => handleToggle("announcements")}
          />
        </div>

        {/* Disable All Sound Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Disable All Sound Notifications</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">
              Mute all notifications on loan requests, repayments etc.
            </p>
          </div>
          
          <ToggleButton
            isEnabled={settings.disableSound}
            onToggle={() => handleToggle("disableSound")}
          />
        </div>
      </div>
    </div>
  );
}