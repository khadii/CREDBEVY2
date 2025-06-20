"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";

import { AppDispatch, RootState } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { _single_loan_products_request } from "@/app/Redux/Loan_request/loan_request_thunk";
import DocumentViewerModal from "../../LoanDetials/DocumentViewerModal";
import Table from "../../TableThree/GeneralreuseableTable";


const DocumentsTable = ({ LoanRequest_Data }: { LoanRequest_Data: any }) => {
  const tableHead = ["Document Name", "Type", "Date Uploaded", "Actions"];
  const [viewMode, setViewMode] = useState<{ [key: string]: boolean }>({});
  const [currentDocument, setCurrentDocument] = useState<{url: string, name: string} | null>(null);

  const formatTableData = () => {
    if (!LoanRequest_Data?.loan?.documents) return [];
    
    return LoanRequest_Data.loan.documents.map((doc: any) => ({
      id: doc.uuid,
      name: doc.document_name,
      type: doc.category,
      date: new Date(doc.created_at).toLocaleDateString(),
      path: doc.path
    }));
  };

  const handleDownload = (filePath: string, fileName: string) => {
    const fullUrl = filePath.startsWith('http') ? filePath : `${window.location.origin}/${filePath}`;
    
    fetch(fullUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  };

  const toggleViewMode = (docId: string, filePath: string, fileName: string) => {
    const fullUrl = filePath.startsWith('http') ? filePath : `${window.location.origin}/${filePath}`;
    
    setViewMode(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));

    if (!viewMode[docId]) {
      setCurrentDocument({
        url: fullUrl,
        name: fileName
      });
    } else {
      setCurrentDocument(null);
    }
  };

  const closeDocumentViewer = () => {
    setCurrentDocument(null);
    // Reset all view modes when closing
    setViewMode({});
  };

  const renderCell = (data: any, header: string) => {
    switch (header) {
      case "Document Name":
        return <div className="truncate max-w-48 ">{data.name}</div>;
      case "Type":
        return <div className="truncate max-w-28 capitalize">{data.type.replace(/_/g, ' ')}</div>;
      case "Date Uploaded":
        return <span className="truncate">{data.date}</span>;
      case "Actions":
        return (
          <div className="flex gap-2">
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => toggleViewMode(data.id, data.path, data.name)}
            >
              {viewMode[data.id] ? (
                <EyeOff size={16} className="text-gray-600" />
              ) : (
                <Eye size={16} className="text-gray-600" />
              )}
            </button>
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => handleDownload(data.path, data.name)}
            >
              <Download size={16} className="text-gray-600" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Table
        headers={tableHead}
        data={formatTableData()}
        titleProps={{
          mainTitle: "User documents",
          requestCount: `${formatTableData().length} documents`,
          subtitle: "List of documents related to request",
        }}
        renderCell={renderCell}
      />
      
      {/* Document Viewer Modal */}
      {currentDocument && (
        <DocumentViewerModal
          documentUrl={currentDocument.url}
          documentName={currentDocument.name}
          onClose={closeDocumentViewer}
        />
      )}
    </>
  );
};

export default DocumentsTable;