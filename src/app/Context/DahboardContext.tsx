'use client'
import { createContext, useContext, ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import { Toaster } from "react-hot-toast";


const DashboardContext = createContext<any | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [interested, setInterested] = useState<boolean>(false);
   const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <Provider store={store}> <DashboardContext.Provider value={{ interested, setInterested,selectedIds, setSelectedIds}}>
       <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0F5959",
            color: "#fff",
            padding: "16px",
            fontSize: "14px",
            borderRadius: "8px",
          },
          success: {
            style: {
              background: "#4CAF50",
            },
          },
          error: {
            style: {
              background: "#FF3B30",
            },
          },
        }}/>
     
      {children} 
    </DashboardContext.Provider></Provider> 
  );
};
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  // if (!context) {
  //   throw new Error("useDashboard must be used within a DashboardProvider");
  // }
  return context;
};


