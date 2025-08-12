import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

const LanguageSelectorComponent = () => {
  const { i18n } = useTranslation();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <ButtonGroup>
        <Button onClick={() => i18n.changeLanguage('en-US')}>
          <Typography>English</Typography>
        </Button>
        <Button onClick={() => i18n.changeLanguage('de-DE')}>
          <Typography>Deutsch</Typography>
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default LanguageSelectorComponent;
