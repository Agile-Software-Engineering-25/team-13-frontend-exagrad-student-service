import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { student, performances } from './mockData';

const generatePerformanceOverview = () => {
  const doc = new jsPDF();

  // Header
  doc.text('Hochschule für Angewandte Wissenschaften', 14, 20);
  doc.text(`Student: ${student.name}` , 14, 30);
  doc.text(`Matriculation Number: ${student.matriculationNumber}`, 14, 40);
  doc.text(`Course: ${student.course}`, 14, 50);
  doc.text(`Semester: ${student.semester}`, 14, 60);
  doc.text(`Date: ${new Date().toLocaleDateString('de-DE')}`, 14, 70);

  // Table
  autoTable(doc, {
    startY: 80,
    head: [['Module/Course', 'Exam', 'Attempt', 'Date', 'Points', 'Grade', 'Status', 'ECTS']],
    body: performances.map(p => [p.module, p.exam, p.attempt, p.date, p.points, p.grade, p.status, p.ects]),
    didDrawPage: (data) => {
      // Footer
      doc.text('This is not an official document.', 14, data.cursor.y + 10);
    }
  });

  return doc.output('datauristring');
};

export const downloadPdf = () => {
  const doc = new jsPDF();

  // Header
  doc.text('Hochschule für Angewandte Wissenschaften', 14, 20);
  doc.text(`Student: ${student.name}` , 14, 30);
  doc.text(`Matriculation Number: ${student.matriculationNumber}`, 14, 40);
  doc.text(`Course: ${student.course}`, 14, 50);
  doc.text(`Semester: ${student.semester}`, 14, 60);
  doc.text(`Date: ${new Date().toLocaleDateString('de-DE')}`, 14, 70);

  // Table
  autoTable(doc, {
    startY: 80,
    head: [['Module/Course', 'Exam', 'Attempt', 'Date', 'Points', 'Grade', 'Status', 'ECTS']],
    body: performances.map(p => [p.module, p.exam, p.attempt, p.date, p.points, p.grade, p.status, p.ects]),
    didDrawPage: (data) => {
      // Footer
      doc.text('This is not an official document.', 14, data.cursor.y + 10);
    }
  });

  const lastName = student.name.split(' ').pop() || 'Mustermann';
  const date = new Date().toISOString().slice(0, 10);
  doc.save(`Leistungsuebersicht_${lastName}_${date}.pdf`);
}

export const downloadPdfFromDataUri = (dataUri: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUri;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default generatePerformanceOverview;