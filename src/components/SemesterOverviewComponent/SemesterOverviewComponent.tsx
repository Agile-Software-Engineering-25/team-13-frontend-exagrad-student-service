import { Box, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

const SemesterOverviewComponent = (props: {
  setSelectedSemester: (semester: {
    id: number | null;
    titleKey: string | null;
  }) => void;
}) => {
  const { t } = useTranslation();

  //Schrift (größe,...) anpassen wenn Theme da ist

  const semesterBoxes = [
    {
      id: 1,
      title: `components.semesterOverview.semesters.firstSemester`,
    },
    {
      id: 2,
      title: `components.semesterOverview.semesters.secondSemester`,
    },
    {
      id: 3,
      title: `components.semesterOverview.semesters.thirdSemester`,
    },
    {
      id: 4,
      title: `components.semesterOverview.semesters.fourthSemester`,
    },
    {
      id: 5,
      title: `components.semesterOverview.semesters.fifthSemester`,
    },
    {
      id: 6,
      title: `components.semesterOverview.semesters.sixthSemester`,
    },
  ];

  return (
    <Box
      sx={{
        pl: 4,
        pr: 4,
        pb: 4,
        background: '#F3F8FF',
        borderRadius: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Typography level="h3" padding={2} sx={{ color: '#00122B' }}>
        {t('components.semesterOverview.title')}
      </Typography>

      <Grid container columnSpacing={4} rowSpacing={2} sx={{ flexGrow: 1 }}>
        {semesterBoxes.map((box, i) => (
          <Grid xs={4} key={i}>
            <Box
              sx={{
                p: 2,
                background: '#FFFFFF',
                border: '2px solid #C2CAD5',
                borderRadius: 14,
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: '0px 4px 4px rgba(0,0,0,0.2)',
                },
              }}
              onClick={() =>
                props.setSelectedSemester({ id: box.id, titleKey: box.title })
              }
            >
              <Typography level="h4" sx={{ color: '#002E6D' }}>
                {t(box.title)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SemesterOverviewComponent;
