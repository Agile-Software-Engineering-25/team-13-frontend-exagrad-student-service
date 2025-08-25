import { Box, Typography, Button } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import ExamDatesModal from '@/components/Modals/ExamDatesModal/ExamDatesModal';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newsOpen, setNewsOpen] = useState(false);

  return (
    <Box sx={{ padding: 2, maxWidth: 700, mx: 'auto' }}>
      <Typography>{t('pages.home.title')}</Typography>

      <Button onClick={() => navigate('/weather')}>
        {t('pages.home.weatherButton')}
      </Button>

      <Button onClick={() => setNewsOpen(true)}>
        {t('pages.home.examDatesButton')}
      </Button>

      <LanguageSelectorComponent />

      <ExamDatesModal open={newsOpen} setOpen={setNewsOpen} />
    </Box>
  );
};

export default Home;
