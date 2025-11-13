import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { LecturerFeedback } from '@custom-types/lecturerFeedback';
import type { Course, Exam } from '@custom-types/examData';

interface StudentInfo {
  firstName: string;
  lastName: string;
  userId: string;
}

interface PdfOptions {
  courses?: Course[];
  studentCourse?: string;
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
  doc.text(
    'HINWEIS: Dies ist kein offizielles Dokument der Provadis Hochschule.',
    14,
    80
  );
  doc.text(
    'NOTE: This is not an official document from Provadis Hochschule.',
    14,
    86
  );
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  // Table
  autoTable(doc, {
    startY: 95,
    head: [['Course', '', 'Points', 'Grade', 'Comment']],
    body: feedbacks.map((f) => ['Unknown', f.points, f.grade]),
  });

  return doc.output('datauristring');
};

export const downloadPdf = (
  feedbacks: LecturerFeedback[],
  studentInfo: StudentInfo,
  options: PdfOptions = {}
) => {
  const doc = new jsPDF();

  const fullName = `${studentInfo.firstName} ${studentInfo.lastName}`;
  const feedbackArray = Array.isArray(feedbacks) ? feedbacks : [];
  const { courses = [], studentCourse = 'Unknown' } = options;

  // Helper to find course and exam by examUuid
  const getExamAndCourseInfo = (examUuid: string) => {
    for (const course of courses) {
      const exam = course.exams?.find((e: Exam) => e.id === examUuid);
      if (exam) {
        return {
          courseName: course.courseName || 'Unknown',
          courseCode: course.courseCode || '',
          creditPoints: course.creditPoints || 0,
          exam,
        };
      }
    }
    return null;
  };

  // Add logo
  try {
    doc.addImage('/provadis_logo.png', 'PNG', 14, 10, 30, 20);
  } catch (e) {
    console.warn('Could not load logo image');
  }

  // Header
  doc.setFontSize(16);
  doc.text('Leistungsuebersicht', 50, 20);
  doc.setFontSize(12);
  doc.text(`Student:in: ${fullName}`, 14, 35);
  doc.text(`Studiengang: ${studentCourse}`, 14, 42);
  doc.text(`Datum: ${new Date().toLocaleDateString('de-DE')}`, 14, 49);

  // Disclaimer
  doc.setFontSize(10);
  doc.setTextColor(255, 0, 0);
  doc.text(
    'HINWEIS: Dies ist kein offizielles Dokument der Provadis Hochschule.',
    14,
    60
  );
  doc.text(
    'NOTE: This is not an official document from Provadis Hochschule.',
    14,
    66
  );
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  // Table
  autoTable(doc, {
    startY: 75,
    head: [['Modul', 'ECTS', 'Note']],
    body: feedbackArray.map((f) => {
      const info = getExamAndCourseInfo(f.examUuid);
      return [
        info ? `${info.courseName} (${info.courseCode})` : 'Unknown',
        info ? info.creditPoints.toString() : '-',
        f.grade?.toFixed(1) || '-',
      ];
    }),
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 30, halign: 'center' },
    },
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
