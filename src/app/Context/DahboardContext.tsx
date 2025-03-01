'use client'
import { createContext, useContext, ReactNode, useState } from "react";

const DashboardContext = createContext<any | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [interested, setInterested] = useState<boolean>(false);

  return (
    <DashboardContext.Provider value={{ interested, setInterested }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook for easier access to context
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};


