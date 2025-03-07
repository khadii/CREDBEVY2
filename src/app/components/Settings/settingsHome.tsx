'use client'

import React, { useState } from 'react'
import { Tabs } from '../Tabs'
import Company_info from './Company_info';
import NotificationSettings from './Notifications';
import IntegrationGrid from './Integrations';
import User_management from './user_management';
import User_Roles from './User_Roles';
import SecuritySettings from './SecuritySettings';
import PaymentMethodSelection from './PaymentMethodSelection';

export default function SettingsHome() {
    const navItems = [
        { name: "Company Info" },
        { name: "Notifications" },
        { name: "Payments" },
        { name: "Integrations" },
        { name: "User management" },
        { name: "Group Management" },
        { name: "User Roles" },
        { name: "Security & Password" },
        { name: "Logs" }
    ];

    const [activeTab, setActiveTab] = useState(navItems[0].name);

    const renderTabContent = () => {
        switch (activeTab) {
            case "Company Info":
                return <Company_info />;
            case "Notifications":
                return <NotificationSettings />;
            case "Payments":
                return <div><PaymentMethodSelection/></div>;
            case "Integrations":
                return <IntegrationGrid />;
            case "User management":
                return <User_management/>; 
            case "Group Management":
                return <div>Group Management Content</div>; 
            case "User Roles":
                return <div><User_Roles/></div>; 
            case "Security & Password":
                return <div><SecuritySettings/></div>; 
            case "Logs":
                return <div>Logs Content</div>;
            default:
                return null;
        }
    }

    return (
        <div className=''>
            <p className='text-[34px] font-bold mb-8 text-[#333333]'>Settings</p>
            <div className='mb-[40px]'>
                <Tabs tabs={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            {renderTabContent()}
        </div>
    )
}
