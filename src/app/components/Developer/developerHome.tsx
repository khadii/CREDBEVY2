"use client";

import React, { useState } from "react";
import API_Keys from "./API_Keys";
import Webhook_URLs from "./Webhook_URLs";
import { Tabs } from "../Tabs";

const DveloperForm = () => {
  const navItems = [
    { name: "API Keys" },
    { name: "Webhook URLs" },
    { name: "Event Logs" },
  ];

  const [activeTab, setActiveTab] = useState(navItems[0].name);

  const renderTabContent = () => {
    switch (activeTab) {
      case "API Keys":
        return <API_Keys />;
      case "Webhook URLs":
        return <Webhook_URLs />;
      case "Event Logs":
        return <div>coming soon</div>;
      default:
        return null;
    }
  };

  return (
    <div className=" pb-[288px]">
      <p className="text-[34px] font-bold mb-8 text-[#333333]">Developer</p>
      <div className="mb-[40px]">
        <Tabs
          tabs={navItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      {renderTabContent()}
      <p className=" font-medium text-[14px] leading-[20px] tracking-[0px] align-middle mt-[19px] text-[#8A8B9F]">
        Need help with webhook integration?{" "}
        <span className=" font-semibold text-[14px] leading-[20px] tracking-[0px] align-middle text-[#156064] ml-[10px]">
          Read Documentation
        </span>
      </p>
    </div>
  );
};

export default DveloperForm;
