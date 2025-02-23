"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";
import { HeaderWithTabs } from "../HeadersTab";
import Table from "../ChartCards/GeneralreuseableTable";

const DocumentsTable = () => {
  const tableHead = ["Document Name", "Type", "Date Uploaded", "Actions"];

  const tableData = [
    { id: 1, name: "My Bank Statement", type: "Bank Statement", date: "09/08/2023" },
    { id: 2, name: "Bank Statement", type: "Bank Statement", date: "09/08/2023" },
    { id: 3, name: "Bank Statement", type: "Bank Statement", date: "09/08/2023" },
  ];

  // Define how each cell should be rendered based on the header
  const renderCell = (data: any, header: string) => {
    switch (header) {
      case "Document Name":
        return <span className="truncate">{data.name}</span>;
      case "Type":
        return <span className="truncate">{data.type}</span>;
      case "Date Uploaded":
        return <span className="truncate">{data.date}</span>;
      case "Actions":
        return (
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Eye size={16} className="text-gray-600" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download size={16} className="text-gray-600" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Table
      headers={tableHead}
      data={tableData}
      titleProps={{
        mainTitle: "User documents",
        requestCount: "200 documents",
        subtitle: "List of documents related to request",
      }}
      renderCell={renderCell}
    />
  );
};

export default DocumentsTable;