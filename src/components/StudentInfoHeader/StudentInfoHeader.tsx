import { Box, Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';

const StudentInfoHeader = () => {
  const { t, i18n } = useTranslation();

  interface StudentData {
    degreeProgram: string;
    matriculationNumber: string;
    creditPoints: string;
    start: Date;
    end: Date;
    major: string;
    year: string;
    group: string;
    average: string;
  }

  const headerProperties = [
    'degreeProgram',
    'matriculationNumber',
    'creditPoints',
    'start',
    'major',
    'year',
    'group',
    'average',
    'end',
  ];

  const mockData: Record<string, StudentData> = {
    '1': {
      degreeProgram: 'Bachelor Informatik Telekom',
      matriculationNumber: 'A025',
      creditPoints: '90/170',
      start: new Date('2025-02-01'),
      end: new Date('2026-05-03'),
      major: 'N/A',
      year: '2025',
      group: 'BIN-T25-F-4',
      average: '2.0',
    },
  };

  const student = mockData['1'];

  const formatValue = (value: StudentData[keyof StudentData]) => {
    if (value instanceof Date) {
      return value.toLocaleDateString(i18n.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return value;
  };

  return (
    <Box
      sx={{
        pl: { xs: 2, sm: 2, md: 3, xl: 4 },
        pr: { xs: 2, sm: 2, md: 3, xl: 4 },
        pb: { xs: 2, sm: 2, md: 3, xl: 4 },
        background: '#F3F8FF',
        borderRadius: 30,
      }}
    >
      <Typography level="h3" padding={2} sx={{ color: '#00122B' }}>
        {t('components.studentInfoHeader.title')}
      </Typography>

      <Grid
        container
        columns={{ xs: 3, sm: 8, md: 10 }}
        columnSpacing={{ xs: 2, sm: 2, md: 3, xl: 4 }}
        rowSpacing={2}
        sx={{ flexGrow: 1, justifyContent: 'flex-start' }}
      >
        {headerProperties.map((key, index) => (
          <Grid
            xs={index === 0 ? 2 : 1}
            sm={index === 0 ? 4 : 2}
            md={index === 0 ? 4 : 2}
            key={index}
          >
            <Box
              sx={{
                p: 1,
                background: '#FFFFFF',
                border: '2px solid #C2CAD5',
                borderRadius: 14,
                textAlign: 'center',
              }}
            >
              <Typography level="title-md" sx={{ color: '#00122B' }}>
                {formatValue(student[key as keyof StudentData])}
              </Typography>
              <Typography level="body-sm" sx={{ color: '#314055' }}>
                {t(`components.studentInfoHeader.${key}`)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentInfoHeader;
