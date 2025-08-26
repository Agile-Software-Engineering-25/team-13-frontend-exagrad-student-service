import { Box, Typography } from '@mui/joy';
import LanguageSelectorComponent from '@components/LanguageSelectorComponent/LanguageSelectorComponent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '@mui/material';
import StudentInfoHeader from '@/components/StudentInfoHeader/StudentInfoHeader';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 2, mx: 'auto', ml: 10, mr: 10 }}>
      <Typography>{t('pages.home.title')}</Typography>
      <StudentInfoHeader/>
      <Button onClick={() => navigate('/weather')}>
        {t('pages.home.weatherButton')}
      </Button>
      <LanguageSelectorComponent />
    </Box>
  );
};

export default Home;
