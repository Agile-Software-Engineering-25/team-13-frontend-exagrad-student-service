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
    '2': {
      degreeProgram: 'Bachelor Wirtschaftsinformatik',
      matriculationNumber: 'A026',
      creditPoints: '90/170',
      start: new Date('2025-02-01'),
      end: new Date('2026-05-03'),
      major: 'N/A',
      year: '2025',
      group: 'BWI-O25-F-1',
      average: '1.8',
    },
    '3': {
      degreeProgram: 'Bachelor Informatik',
      matriculationNumber: 'A026',
      creditPoints: '90/170',
      start: new Date('2025-02-01'),
      end: new Date('2026-05-03'),
      major: 'N/A',
      year: '2025',
      group: 'BWI-O25-F-1',
      average: '4.0',
    },
  };

  const student = mockData['3'];

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
        pl: 3,
        pr: 3,
        pb: 3,
        border: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        borderRadius: 'xl',
      }}
    >
      <Typography level="h3" padding={2}>
        {t('pages.home.studentInfoHeader.title')}
      </Typography>

      <Grid container columnSpacing={4} rowSpacing={2} sx={{ flexGrow: 1 }}>
        {headerProperties.map((key, index) => (
          <Grid xs={index === 0 ? 4.8 : 2.4} key={index}>
            <Box
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: 'neutral.outlinedBorder',
                borderRadius: 'lg',
                textAlign: 'center',
              }}
            >
              <Typography level="title-md">
                {formatValue(student[key as keyof StudentData])}
              </Typography>
              <Typography level="body-sm">
                {t(`pages.home.studentInfoHeader.${key}`)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentInfoHeader;
