import { useState } from 'react';
import { Typography, Select, Option, Table, Box, Divider } from '@mui/joy';
import GenericModal from '@components/Modals/GenericModal';
import { useTranslation } from 'react-i18next';

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

const mockData: Record<string, SemesterData> = {
  '1': {
    exams: [
      {
        code: 'Kurz1',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 101',
        date: '01.02.2025',
      },
      {
        code: 'Kurz2',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 102',
        date: '05.02.2025',
      },
    ],
    retakes: [
      {
        code: 'Kurz1',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 201',
        date: '10.03.2025',
      },
      {
        code: 'Kurz2',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 202',
        date: '15.03.2025',
      },
    ],
  },
  '2': {
    exams: [
      {
        code: 'Kurz3',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 301',
        date: '02.07.2025',
      },
      {
        code: 'Kurz4',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 302',
        date: '06.07.2025',
      },
    ],
    retakes: [
      {
        code: 'Kurz3',
        lecturer: '(Prof.) Dr. FirstName LastName',
        room: 'Raum 401',
        date: '20.09.2025',
      },
      {
        code: 'Kurz4',
        lecturer: '(Prof.) Dr. FirstName LastName',
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
  const { t } = useTranslation();
  const [semester, setSemester] = useState<string>('1');

  const data: SemesterData = mockData[semester] ?? { exams: [], retakes: [] };

  return (
    <GenericModal
      header={t('components.examDatesModal.header')}
      open={open}
      setOpen={setOpen}
      modalDialogSX={{ minWidth: '700px' }}
    >
      {/* Semester Dropdown */}
      <Box sx={{ mb: 2 }}>
        <Typography level="body-sm" sx={{ mb: 0.5 }}>
          {t('components.examDatesModal.semester')}
        </Typography>
        <Select
          value={semester}
          onChange={(_, value) => value && setSemester(value)}
        >
          <Option value="1">1. Semester</Option>
          <Option value="2">2. Semester</Option>
          <Option value="3">3. Semester</Option>
          <Option value="4">4. Semester</Option>
          <Option value="5">5. Semester</Option>
          <Option value="6">6. Semester</Option>
        </Select>
      </Box>

      {/* Prüfungstermine Section */}
      <Typography level="title-md" sx={{ mb: 1 }}>
        {t('components.examDatesModal.exams')}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Table>
        <thead>
          <tr>
            <th>{t('components.examDatesModal.table.code')}</th>
            <th>{t('components.examDatesModal.table.lecturer')}</th>
            <th>{t('components.examDatesModal.table.room')}</th>
            <th>{t('components.examDatesModal.table.date')}</th>
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
        {t('components.examDatesModal.retakes')}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Table>
        <thead>
          <tr>
            <th>{t('components.examDatesModal.table.code')}</th>
            <th>{t('components.examDatesModal.table.lecturer')}</th>
            <th>{t('components.examDatesModal.table.room')}</th>
            <th>{t('components.examDatesModal.table.date')}</th>
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
