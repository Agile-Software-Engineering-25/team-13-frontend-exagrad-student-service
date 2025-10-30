import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { LecturerFeedback } from '@custom-types/lecturerFeedback';

interface StudentInfo {
  firstName: string;
  lastName: string;
  userId: string;
}

const generatePerformanceOverview = (
  feedbacks: LecturerFeedback[],
  studentInfo: StudentInfo
) => {
  const doc = new jsPDF();

  const fullName = `${studentInfo.firstName} ${studentInfo.lastName}`;

  // Add logo
  const logo = new Image();
  logo.src = '/provadis_logo.png';
  doc.addImage(logo, 'PNG', 14, 10, 40, 20);

  // Header
  doc.text('Provadis Hochschule', 60, 20);
  doc.text(`Student: ${fullName}`, 14, 40);
  doc.text(`Student ID: ${studentInfo.userId}`, 14, 50);
  doc.text(`Course: Unknown`, 14, 60);
  doc.text(`Date: ${new Date().toLocaleDateString('de-DE')}`, 14, 70);

  // Disclaimer
  doc.setFontSize(10);
  doc.setTextColor(255, 0, 0);
  doc.text('HINWEIS: Dies ist kein offizielles Dokument der Provadis Hochschule.', 14, 80);
  doc.text('NOTE: This is not an official document from Provadis Hochschule.', 14, 86);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  // Table
  autoTable(doc, {
    startY: 95,
    head: [['Course',, 'Points', 'Grade', 'Comment']],
    body: feedbacks.map((f) => [
      'Unknown',
      f.points,
      f.grade,
    ]),
  });

  return doc.output('datauristring');
};

export const downloadPdf = (
  feedbacks: LecturerFeedback[],
  studentInfo: StudentInfo
) => {
  const doc = new jsPDF();

  const fullName = `${studentInfo.firstName} ${studentInfo.lastName}`;

  // Add logo
  const logo = new Image();
  logo.src = '/provadis_logo.png';
  doc.addImage(logo, 'PNG', 14, 10, 80, 40);

  // Header
  doc.text('Leistungsuebersicht', 80, 20);
  doc.text(`Student:in: ${fullName}`, 14, 40);
  doc.text(`Studiengang: Unknown`, 14, 50);
  doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 14, 60);

  // Disclaimer
  doc.setFontSize(10);
  doc.setTextColor(255, 0, 0);
  doc.text('HINWEIS: Dies ist kein offizielles Dokument der Provadis Hochschule.', 14, 80);
  doc.text('NOTE: This is not an official document from Provadis Hochschule.', 14, 86);
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  // Table
  autoTable(doc, {
    startY: 95,
    head: [['Course', 'Credit Points', 'Grade']],
    body: feedbacks.map((f) => [
      'Unknown', // TODO get course name from courseAPI team-09
      '5', // TODO get etcs from courseAPI team-09
      f.grade,
    ]),
  });

  const date = new Date().toISOString().slice(0, 10);
  doc.save(`Leistungsuebersicht_${studentInfo.lastName}_${date}.pdf`);
};

export const downloadPdfFromDataUri = (dataUri: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default generatePerformanceOverview;

