import { useState } from 'react';
import { Box, Button } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import StudentInfoHeader from '@/components/StudentInfoHeader/StudentInfoHeader';
import SemesterOverviewComponent from '@/components/SemesterOverviewComponent/SemesterOverviewComponent';
import ExamDatesModal from '@/components/Modals/ExamDatesModal/ExamDatesModal';
import ModuleOverviewComponent from '@/components/SemesterOverviewComponent/ModuleOverviewComponent';
import RetakeRegistrationModal from '@/components/Modals/RetakeRegistrationModal/RetakeRegistrationModal';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [viewExamDates, setViewExamDates] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<{id: number | null; titleKey: string | null}>({id: null, titleKey: null});
  const [viewRetakeRegistration, setViewRetakeRegistration] = useState(false);

  return (
    <Box sx={{ paddingInline: 30, paddingBlock: 2, mx: 'auto' }}>
      <StudentInfoHeader />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setViewRetakeRegistration(true)}
        >
          {t('pages.home.buttons.re-examinationRegistration')}
        </Button>

        <Button variant="outlined" onClick={() => navigate('/weather')}>
          {t('pages.home.buttons.pubSubmission')}
        </Button>

        <Button variant="outlined" onClick={() => setViewExamDates(true)}>
          {t('pages.home.buttons.viewExamDates')}
        </Button>

        <Button variant="solid" onClick={() => navigate('/weather')}>
          {t('pages.home.buttons.downloadPerformanceOverview')}
        </Button>
      </Box>

      <ExamDatesModal open={viewExamDates} setOpen={setViewExamDates} />
      <>
        {selectedSemester.id === null ? (
          <SemesterOverviewComponent setSelectedSemester={setSelectedSemester} />
        ) : (
          <ModuleOverviewComponent
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
          />
        )}
      </>
      <RetakeRegistrationModal
        open={viewRetakeRegistration}
        setOpen={setViewRetakeRegistration}
      />

      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
