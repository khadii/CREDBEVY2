"use client"

import { useState } from "react"
import { Switch } from "../FormInputs/Switch"


export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    desktopNotification: true,
    unreadBadge: true,
    communicationEmails: true,
    announcements: false,
    disableSound: false,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <div className=" max-w-[700px] h-screen">
      <div className="space-y-8">
        {/* Desktop Notification */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Enable Desktop Notification</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">Receive notification from all loan requests, repayments etc.</p>
          </div>
          <Switch
            checked={settings.desktopNotification}
            onCheckedChange={() => handleToggle("desktopNotification")}
            className="[#156064]-[state=checked]:bg-teal-600"
          />
        </div>

        {/* Unread Notification Badge */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Enable Unread Notification Badge</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">Show a red icon when notifications are unread</p>
          </div>
          <Switch
            checked={settings.unreadBadge}
            onCheckedChange={() => handleToggle("unreadBadge")}
            className="[#156064]-[state=checked]:bg-teal-600"
          />
        </div>

        {/* Communication Emails */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Communication Emails</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">Receive emails for Loan requests, repayment etc.</p>
          </div>
          <Switch
            checked={settings.communicationEmails}
            onCheckedChange={() => handleToggle("communicationEmails")}
            className="[#156064]-[state=checked]:bg-teal-600"
          />
        </div>

        {/* Announcements & Updates */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Announcements & Updates</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">Receive announcements for our products and services.</p>
          </div>
          <Switch
            checked={settings.announcements}
            onCheckedChange={() => handleToggle("announcements")}
            className="[#156064]-[state=checked]:bg-teal-600"
          />
        </div>

        {/* Disable All Sound Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Disable All Sound Notifications</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">Mute all notifications on loan requests, repayments etc.</p>
          </div>
          <Switch
            checked={settings.disableSound}
            onCheckedChange={() => handleToggle("disableSound")}
            className="[#156064]-[state=checked]:bg-teal-600"
          />
        </div>
      </div>
    </div>
  )
}

