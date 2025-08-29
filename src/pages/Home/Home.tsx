import { useState } from 'react';
import { Box } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@mui/joy';
import StudentInfoHeader from '@/components/StudentInfoHeader/StudentInfoHeader';
import ExamDatesModal from '@/components/Modals/ExamDatesModal/ExamDatesModal';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewExamDates, setViewExamDates] = useState(false);

  return (
    <Box sx={{ padding: 2, mx: 'auto', ml: 10, mr: 10 }}>
      <StudentInfoHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3,
          gap: 2,
        }}
      >
        <Button variant="outlined" onClick={() => navigate('/weather')}>
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
      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
