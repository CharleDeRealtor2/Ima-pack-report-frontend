// ExportButtons.jsx
import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportButtons = ({ data }) => {
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([data]);
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'report.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('IMA Pack Report', 10, 10);
    const entries = Object.entries(data).map(([key, value]) => [key, JSON.stringify(value)]);
    doc.autoTable({ head: [['Field', 'Value']], body: entries });
    doc.save('report.pdf');
  };

  return (
    <div className="flex gap-4 mt-4">
      <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Export Excel
      </button>
      <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;
