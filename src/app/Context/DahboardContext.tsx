"use client";
import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "../Redux/store";
import { Toaster } from "react-hot-toast";
import { _single_loan_products_request, all_loan_requests } from "../Redux/Loan_request/loan_request_thunk";

const DashboardContext = createContext<any | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [interested, setInterested] = useState<boolean>(false);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [authPin, setAuhPin] = useState();
  const [pendingRequestCount, setPendingRequestCount] = useState<number>(0);
  
  const tabs = [
    { name: "All Request" },
    { name: "Pending Request", count: pendingRequestCount },
    { name: "Approved Requests" },
    { name: "Canceled Requests" },
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0].name);
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  
  const filters = useMemo(
    () => ({
      search: "",
      sort_by: "DESC",
      start_date: "",
      end_date: "",
      single: false,
      limit: "",
      paginate: false,
      filter_by: "",
      approvalStatus: "",
      page: "",
    }),
    []
  );

  const filtersApproved = {
    search: "",
    sort_by: "DESC",
    start_date: "",
    end_date: "",
    single: false,
    limit: "",
    paginate: true,
    filter_by: "",
    approvalStatus: "approved",
    page: currentPage,
  };

  const filtersPending = {
    search: "",
    sort_by: "DESC",
    start_date: "",
    end_date: "",
    single: false,
    limit: "",
    paginate: true,
    filter_by: "",
    approvalStatus: "pending",
    page: currentPage,
  };

  return (
    <Provider store={store}>
      <DashboardContextContent 
        children={children}
        interested={interested}
        setInterested={setInterested}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        authPin={authPin}
        setAuhPin={setAuhPin}
        tabs={tabs}
        pendingRequestCount={pendingRequestCount}
        setPendingRequestCount={setPendingRequestCount}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filters={filters}
        filtersPending={filtersPending}
        filtersApproved={filtersApproved}
        currentPage = {currentPage}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
         setIsLoading={setIsLoading}
      />
    </Provider>
  );
};

const DashboardContextContent = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => {
  const dispatch = useDispatch<AppDispatch>();








  
  const refreshData = () => {
    if (props.activeTab === "Pending Request") {
      dispatch(all_loan_requests(props.filtersPending));
    } else if (props.activeTab === "Approved Requests") {
      dispatch(all_loan_requests(props.filtersApproved));
    } else {
      dispatch(all_loan_requests(props.filters));
    }
  };




  



  return (
    <DashboardContext.Provider
      value={{
        ...props,
        refreshData,
      }}
    >
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
        }}
      />
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  return context;
};