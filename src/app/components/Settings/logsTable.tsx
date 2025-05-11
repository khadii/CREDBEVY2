"use client";

import { useEffect, useState } from "react";
import { StatusWithOptions } from "./StatusWithOptions";
import Table from "../TableThree/GeneralreuseableTablewithpagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/Redux/store";
import { LogsSlice } from "@/app/Redux/logs/logs_thunk";
import { formatDate } from "@/app/lib/formatdate";

const LogsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: logsData,
    pagination,
    loading,
    error,
  } = useSelector((state: any) => state.auditLogs);

  const tableHead = [
    "Date and Time",
    "User",
    "Description",
    "IP Address",
    "User Agent",
    "Status",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    const params = {
      search: "",
      audit_level: "", 
      status: "",
      page: currentPage
    };
    dispatch(LogsSlice(params));
  }, [dispatch, currentPage]);

  const renderStatus = (status: string) => (
    <StatusWithOptions status={status} />
  );

  const renderCell = (data: any, header: string) => {
    if (!data) return null;

    switch (header) {
      case "Date and Time":
        return <div className="truncate max-w-36">{formatDate(data.created_at)}</div>;
      case "User":
        return <div className="truncate max-w-36">{data.user_id || "N/A"}</div>;
      case "Description":
        return <div className="truncate max-w-28">{data.action}</div>;
      case "IP Address":
        return <div className="truncate max-w-28">{data.source_ip_address}</div>;
      case "User Agent":
        return <div className="truncate max-w-48">{data.user_agent}</div>;
      case "Status":
        return renderStatus(data.status);
      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <Table
        headers={tableHead}
        data={logsData}
        renderCell={renderCell}
        titleProps={{
          mainTitle: "Audit Logs",
          requestCount: `${pagination?.total || 0} logs`,
          subtitle: "List of all activities on the dashboard",
        }}
        currentPage={currentPage}
        totalPages={pagination?.last_page || 1}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default LogsTable;