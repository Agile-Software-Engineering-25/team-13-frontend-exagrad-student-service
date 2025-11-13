import { Box, Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { StudentData } from '@/@custom-types/studentData';
import useCombinedStudentData from '@/hooks/useCombinedStudentData';
import useUser from '@/hooks/useUser';

const StudentInfoHeader = () => {
  const { t, i18n } = useTranslation();
  const { fetchAndStoreCombinedData } = useCombinedStudentData();
  const { getUserId } = useUser();

  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await fetchAndStoreCombinedData(getUserId());
        if (studentData) {
          setStudent(studentData);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchAndStoreCombinedData, getUserId]);

  const formatValue = (value: string | number | Date | undefined) => {
    if (value instanceof Date) {
      return value.toLocaleDateString(i18n.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return value ?? '-';
  };

  if (loading) {
    return (
      <Typography level="body-md" sx={{ p: 2, color: '#00122B' }}>
        {t('components.studentInfoHeader.loading')}...
      </Typography>
    );
  }

  if (!student) {
    return (
      <Typography level="body-md" sx={{ p: 2, color: '#00122B' }}>
        {t('components.studentInfoHeader.noDataAvailable')}
      </Typography>
    );
  }

  const headerProperties: { key: keyof StudentData; label: string }[] = [
    { key: 'degreeProgram', label: 'degreeProgram' },
    { key: 'matriculationNumber', label: 'matriculationNumber' },
    { key: 'semester', label: 'semester' },
    { key: 'cohort', label: 'cohort' },
    { key: 'studyStatus', label: 'studyStatus' },
  ];

  /*const headerProperties = [
    'degreeProgram',
    'matriculationNumber',
    'creditPoints',  --> NOT IN STUDENT DATA API
    'start', --> NOT IN STUDENT DATA API
    'major',
    'year', --> NOT IN STUDENT DATA API
    'group', --> cohort
    'average', --> NOT IN STUDENT DATA API
    'end', --> NOT IN STUDENT DATA API
  ];*/

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
        {headerProperties.map(({ key, label }, index) => (
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
                {formatValue(student[key])}
              </Typography>
              <Typography level="body-sm" sx={{ color: '#314055' }}>
                {t(`components.studentInfoHeader.${label}`)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentInfoHeader;
