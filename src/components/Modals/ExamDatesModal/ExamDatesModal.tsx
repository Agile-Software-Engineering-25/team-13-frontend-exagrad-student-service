import { useState } from 'react';
import { Typography, Select, Option, Table, Box, Divider } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';

type Exam = {
  code: string;
  lecturer: string;
  room: string;
  date: string;
};

type SemesterData = {
  exams: Exam[];
  retakes: Exam[];
};

// ---- Mock Data ----
const mockData: Record<string, SemesterData> = {
  '1': {
    exams: [
      {
        code: 'Kurz1',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 101',
        date: '01.02.2025',
      },
      {
        code: 'Kurz2',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 102',
        date: '05.02.2025',
      },
    ],
    retakes: [
      {
        code: 'Kurz1',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 201',
        date: '10.03.2025',
      },
      {
        code: 'Kurz2',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 202',
        date: '15.03.2025',
      },
    ],
  },
  '2': {
    exams: [
      {
        code: 'Kurz3',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 301',
        date: '02.07.2025',
      },
      {
        code: 'Kurz4',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 302',
        date: '06.07.2025',
      },
    ],
    retakes: [
      {
        code: 'Kurz3',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 401',
        date: '20.09.2025',
      },
      {
        code: 'Kurz4',
        lecturer: 'Herr/Frau Dr. Dozent/in',
        room: 'Raum 402',
        date: '25.09.2025',
      },
    ],
  },
  // Add semesters 3–6 as needed
};

type ExamDatesModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ExamDatesModal = ({ open, setOpen }: ExamDatesModalProps) => {
  const [semester, setSemester] = useState<string>('1');

  const data: SemesterData = mockData[semester] ?? { exams: [], retakes: [] };

  return (
    <GenericModal
      header="Übersicht Prüfungstermine"
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      {/* Semester Dropdown */}
      <Box sx={{ mb: 2 }}>
        <Typography level="body-sm" sx={{ mb: 0.5 }}>
          Semester
        </Typography>
        <Select
          value={semester}
          onChange={(_, value) => value && setSemester(value)}
        >
          <Option value="1">1. Semester (Winter 24/25)</Option>
          <Option value="2">2. Semester (Sommer 25)</Option>
          <Option value="3">3. Semester (Winter 25/26)</Option>
          <Option value="4">4. Semester (Sommer 26)</Option>
          <Option value="5">5. Semester (Winter 26/27)</Option>
          <Option value="6">6. Semester (Sommer 27)</Option>
        </Select>
      </Box>

      {/* Prüfungstermine Section */}
      <Typography level="title-md" sx={{ mb: 1 }}>
        Prüfungstermine
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Table>
        <thead>
          <tr>
            <th>Modulkürzel</th>
            <th>Dozent/in</th>
            <th>Raum</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {data.exams.map((exam: Exam, idx: number) => (
            <tr key={idx}>
              <td>{exam.code}</td>
              <td>{exam.lecturer}</td>
              <td>{exam.room}</td>
              <td>{exam.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Nachprüfungstermine Section */}
      <Typography level="title-md" sx={{ mt: 3, mb: 1 }}>
        Nachprüfungstermine
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Table>
        <thead>
          <tr>
            <th>Modulkürzel</th>
            <th>Dozent/in</th>
            <th>Raum</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          {data.retakes.map((exam: Exam, idx: number) => (
            <tr key={idx}>
              <td>{exam.code}</td>
              <td>{exam.lecturer}</td>
              <td>{exam.room}</td>
              <td>{exam.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </GenericModal>
  );
};

export default ExamDatesModal;
