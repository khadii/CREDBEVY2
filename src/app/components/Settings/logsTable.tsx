"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import Table from "../TableThree/GeneralreuseableTable";
import { StatusWithOptions } from "./StatusWithOptions";
import Pagination from "../TableTwo/modifiedTabletwo/tablePagination";


const LogsTable = () => {
  const tableHead = ["Date and Time", "User", "Description", "IP Address", "User Agent", "Status"];
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  const logsData = [
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye",
      description: "Login",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Completed"
    },
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye",
      description: "Transfer",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Failed"
    },
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye",
      description: "Change Password",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Pending"
    },
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye",
      description: "Transfer",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Completed"
    },
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye",
      description: "Change Password",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Completed"
    },
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye",
      description: "Transfer",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Completed"
    },
    {
      date_time: "2023-04-01, 10:00:00",
      user: "Timilehin Oripeloye", 
      description: "Change Password",
      ip_address: "192.168.02.23",
      user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
      status: "Completed"
    }
  ];

  // Calculate paginated data
  const totalPages = Math.ceil(logsData.length / itemsPerPage);
  const paginatedData = logsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderStatus = (status: string) => (
    <StatusWithOptions status={status} />
  );

  const renderCell = (data: any, header: string) => {
    if (!data) return null;

    switch (header) {
      case "Date and Time":
        return <div className="truncate max-w-36">{data.date_time}</div>;
      case "User":
        return <div className="truncate max-w-36">{data.user}</div>;
      case "Description":
        return <div className="truncate max-w-28">{data.description}</div>;
      case "IP Address":
        return <div className="truncate max-w-28">{data.ip_address}</div>;
      case "User Agent":
        return <div className="truncate max-w-48">{data.user_agent}</div>;
      case "Status":
        return renderStatus(data.status);
      default:
        return null;
    }
  };

  return (
    <>
      <Table
        headers={tableHead}
        data={paginatedData} // Use paginated data instead of all data
        renderCell={renderCell} 
        titleProps={{
          mainTitle: "New Logs",
          requestCount: "200 logs",
          subtitle: "List of all activities on the dashboard"
        }}      
      />
      <Pagination
              currentPage={currentPage}
              totalPages={totalPages} setCurrentPage={ setCurrentPage}      
      />
    </>
  );
};

export default LogsTable;