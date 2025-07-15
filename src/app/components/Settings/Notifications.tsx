"use client";

import { useEffect } from "react";
import ToggleButton from "../FormInputs/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { 
  Notification as UpdateNotification,
  GetNotification,
} from "@/app/Redux/company_info/company_info_thunk";
import toast from "react-hot-toast";
import { clearNotificationError, resetNotificationSuccess } from "@/app/Redux/company_info/notificationSlice";
import ErrorDisplay from "../ErrorDisplay";
import AnimatedLoader from "../animation";

export default function NotificationSettings() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Access the entire notification state first
  const notificationState = useSelector((state: any) => state.notification);
  
  // Then safely destructure with fallback values
  const notificationSettings = notificationState?.settings || null;
  const loading = notificationState?.loading || false;
  const error = notificationState?.error || null;
  const success = notificationState?.success || false;

  // Fetch notification settings on mount
  useEffect(() => {
    dispatch(GetNotification());
  }, [dispatch]);

  // Handle toggle changes
  const handleToggle = (field: keyof typeof notificationSettings) => {
    if (!notificationSettings) return;
    
    const updatedSettings = {
      ...notificationSettings,
      [field]: !notificationSettings[field]
    };
    
    dispatch(UpdateNotification(updatedSettings));
  };

  // Show error/success messages
  useEffect(() => {
    // if (error) {
    //   // toast.error(error);
    //   dispatch(clearNotificationError());
    // }
    if (success) {
      toast.success("Notification settings updated successfully");
      dispatch(resetNotificationSuccess());
    }
  }, [error, success, dispatch]);

 

  return (
     <>
    {error ? <ErrorDisplay error={error} title={error}/> : (
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
            isEnabled={notificationSettings?.desktop_notifications || false}
            onToggle={() => handleToggle("desktop_notifications")}
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
            isEnabled={notificationSettings?.unread_notification_badge || false}
            onToggle={() => handleToggle("unread_notification_badge")}
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
            isEnabled={notificationSettings?.communication_emails || false}
            onToggle={() => handleToggle("communication_emails")}
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
            isEnabled={notificationSettings?.announcements_updates || false}
            onToggle={() => handleToggle("announcements_updates")}
          />
        </div>

        {/* Sound Notifications */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#333333]">Sound Notifications</h3>
            <p className="text-[12px] font-bold text-[#8A8B9F]">
              Play sound for notifications
            </p>
          </div>
          
          <ToggleButton
            isEnabled={notificationSettings?.sound_notifications || false}
            onToggle={() => handleToggle("sound_notifications")}
          />
        </div>
      </div>
       <AnimatedLoader isLoading={loading}/>
    </div>
    )}
  </>
    
  );
}