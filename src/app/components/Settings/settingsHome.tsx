'use client'

import React, { useState } from 'react'
import { Tabs } from '../Tabs'
import Company_info from './Company_info';
import NotificationSettings from './Notifications';
import IntegrationGrid from './Integrations';

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

    // A function to render content based on the active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case "Company Info":
                return <Company_info />;
            case "Notifications":
                return <NotificationSettings />;
            case "Payments":
                return <div>Payments Content</div>;
            case "Integrations":
                return <IntegrationGrid />;
            case "User management":
                return <div>User Management Content</div>; 
            case "Group Management":
                return <div>Group Management Content</div>; 
            case "User Roles":
                return <div>User Roles Content</div>; 
            case "Security & Password":
                return <div>Security & Password Content</div>; 
            case "Logs":
                return <div>Logs Content</div>;
            default:
                return null;
        }
    }

    return (
        <div>
            <p className='text-[34px] font-bold mb-8 text-[#333333]'>Settings</p>
            <div className='mb-[40px]'>
                <Tabs tabs={navItems} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            {renderTabContent()}
        </div>
    )
}
