"use client";

import { useState } from "react";
import { Eye, EyeOff, Download } from "lucide-react";
import DocumentViewerModal from "../../LoanDetials/DocumentViewerModal";
import Table from "../../TableThree/GeneralreuseableTable";
import NoDataFound from "../../NoDataFound";

interface Document {
  id: number;
  uuid: string;
  user_uuid: string;
  document_name: string;
  path: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface DocumentsTableProps {
  documents: Document[];
}

const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  const tableHead = ["Document Name", "Type", "Date Uploaded", "Actions"];
  const [viewMode, setViewMode] = useState<{ [key: string]: boolean }>({});
  const [currentDocument, setCurrentDocument] = useState<{url: string, name: string} | null>(null);

  const formatTableData = () => {
    if (!documents) return [];
    
    return documents.map((doc) => ({
      id: doc.uuid,
      name: doc.document_name,
      type: doc.category,
      date: new Date(doc.created_at).toLocaleDateString(),
      path: doc.path
    }));
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      // For direct download links, we can use the anchor tag approach
      const link = document.createElement('a');
      link.href = filePath;
      link.setAttribute('download', fileName);
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback: Open in new tab if download fails
      window.open(filePath, '_blank');
    }
  };

  const toggleViewMode = (docId: string, filePath: string, fileName: string) => {
    setViewMode(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));

    if (!viewMode[docId]) {
      setCurrentDocument({
        url: filePath,
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
        return <div className="truncate max-w-48">{data.name}</div>;
      case "Type":
        return (
          <div className="truncate max-w-28 capitalize">
            {data.type.replace(/_/g, ' ')}
          </div>
        );
      case "Date Uploaded":
        return <span className="truncate">{data.date}</span>;
      case "Actions":
        return (
          <div className="flex gap-2">
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => toggleViewMode(data.id, data.path, data.name)}
              aria-label={viewMode[data.id] ? "Hide document" : "View document"}
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
              aria-label="Download document"
            >
              <Download size={16} className="text-gray-600" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

   if (formatTableData().length < 1) {
      return <NoDataFound />;
    }
  return (
    <>
      <Table
        headers={tableHead}
        data={formatTableData()}
        titleProps={{
          mainTitle: "User documents",
          requestCount: `${documents?.length || 0} documents`,
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