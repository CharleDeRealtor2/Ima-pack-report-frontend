import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToPDF = (formData) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('IMA PACK REPORT', 14, 15);
    doc.setFontSize(10);

    const basicInfo = [
        ['Date', formData.date],
        ['Factory', formData.factory],
        ['Machine Number', formData.machineNumber],
        ['Product Type', formData.productType],
        ['Shift', formData.shift],
    ];

    doc.autoTable({
        head: [['Field', 'Value']],
        body: basicInfo,
        startY: 20,
    });

    // Page 1 Table - Hourly Readings
    const hourlyTable = [
        ['Time', 'Machine Counter', 'Runtime (Minutes)', 'Machine Speed', 'Avg Weight Before', 'Avg Weight After'],
    ];

    for (let i = 0; i < 12; i++) {
        hourlyTable.push([
            `${7 + i}:00 - ${8 + i}:00`,
            '', '', '', '', '', // If you eventually wire inputs, plug them here
        ]);
    }

    doc.autoTable({
        head: [hourlyTable[0]],
        body: hourlyTable.slice(1),
        startY: doc.lastAutoTable.finalY + 10,
        theme: 'striped',
        headStyles: { fillColor: [22, 160, 133] },
    });

    // Page 2 Table - Issues
    const issuesTable = [
        ['#', 'Description', 'What Was Done', 'Start', 'End', 'Downtime', 'Repair?', 'Comment', 'Technician'],
    ];

    for (let i = 1; i <= 30; i++) {
        issuesTable.push([i, '', '', '', '', '', '', '', '']); // Can plug data later
    }

    doc.autoTable({
        head: [issuesTable[0]],
        body: issuesTable.slice(1),
        startY: doc.lastAutoTable.finalY + 10,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [44, 62, 80] },
    });

    // Page 3 Fields
    const summaryInfo = [
        ['Total Runtime', formData.totalRuntime],
        ['Total Downtime', formData.totalDowntime],
        ['OEE', formData.oee],
        ['Availability Rate', formData.availabilityRate],
        ['Performance Rate', formData.performanceRate],
        ['Quality Rate', formData.qualityRate],
        ['Total Counter Reading', formData.totalCounterReading],
        ['IMA Reel Waste', formData.imaReelWaste],
        ['IMA Rejected Reel', formData.imaRejectedReel],
        ['Operator', `${formData.operatorFirstName} ${formData.operatorLastName}`],
        ['Incoming Operator', `${formData.incomingFirstName} ${formData.incomingLastName}`],
    ];

    doc.autoTable({
        head: [['Metric', 'Value']],
        body: summaryInfo,
        startY: doc.lastAutoTable.finalY + 10,
    });

    doc.save('IMA_Pack_Report.pdf');
};

export const exportToExcel = (formData) => {
    const wb = XLSX.utils.book_new();

    // Sheet 1 - Basic Info
    const sheet1 = [
        ['Field', 'Value'],
        ['Date', formData.date],
        ['Factory', formData.factory],
        ['Machine Number', formData.machineNumber],
        ['Product Type', formData.productType],
        ['Shift', formData.shift],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheet1), 'Basic Info');

    // Sheet 2 - Hourly Readings
    const hourly = [
        ['Time', 'Machine Counter', 'Runtime (Minutes)', 'Machine Speed', 'Avg Weight Before', 'Avg Weight After'],
    ];
    for (let i = 0; i < 12; i++) {
        hourly.push([`${7 + i}:00 - ${8 + i}:00`, '', '', '', '', '']);
    }
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(hourly), 'Hourly Readings');

    // Sheet 3 - Issues
    const issues = [
        ['#', 'Description', 'What Was Done', 'Start', 'End', 'Downtime', 'Repair?', 'Comment', 'Technician'],
    ];
    for (let i = 1; i <= 30; i++) {
        issues.push([i, '', '', '', '', '', '', '', '']);
    }
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(issues), 'Issues');

    // Sheet 4 - Summary
    const summary = [
        ['Metric', 'Value'],
        ['Total Runtime', formData.totalRuntime],
        ['Total Downtime', formData.totalDowntime],
        ['OEE', formData.oee],
        ['Availability Rate', formData.availabilityRate],
        ['Performance Rate', formData.performanceRate],
        ['Quality Rate', formData.qualityRate],
        ['Total Counter Reading', formData.totalCounterReading],
        ['IMA Reel Waste', formData.imaReelWaste],
        ['IMA Rejected Reel', formData.imaRejectedReel],
        ['Operator', `${formData.operatorFirstName} ${formData.operatorLastName}`],
        ['Incoming Operator', `${formData.incomingFirstName} ${formData.incomingLastName}`],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(summary), 'Summary');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'IMA_Pack_Report.xlsx');
};
