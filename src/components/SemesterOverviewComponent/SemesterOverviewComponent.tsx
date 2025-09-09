import { Box, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

const SemesterOverviewComponent = (props: {
  setSelectedBox: (id: number | null) => void;
}) => {
  const { t } = useTranslation();

  //Schrift (größe,...) anpassen wenn Theme da ist

  const semesterBoxes = [
    {
      id: 1,
      title: (
        <Typography>
          {t(`components.semesterOverview.semesters.firstSemester`)}
        </Typography>
      ),
    },
    {
      id: 2,
      title: (
        <Typography>
          {t(`components.semesterOverview.semesters.secondSemester`)}
        </Typography>
      ),
    },
    {
      id: 3,
      title: (
        <Typography>
          {t(`components.semesterOverview.semesters.thirdSemester`)}
        </Typography>
      ),
    },
    {
      id: 4,
      title: (
        <Typography>
          {t(`components.semesterOverview.semesters.fourthSemester`)}
        </Typography>
      ),
    },
    {
      id: 5,
      title: (
        <Typography>
          {t(`components.semesterOverview.semesters.fifthSemester`)}
        </Typography>
      ),
    },
    {
      id: 6,
      title: (
        <Typography>
          {t(`components.semesterOverview.semesters.sixthSemester`)}
        </Typography>
      ),
    },
  ];

  //remembers which semesterBox has been clicked and shows the ModuleOverview for that semester, has a "back"-Button to go back to semesterOverview
  /*if (selectedBox !== null) {
    const box = semesterBoxes.find((b) => b.id === selectedBox)!;

    );
  }*/

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
              onClick={() => props.setSelectedBox(box.id)}
            >
              <Typography level="h4" sx={{ color: '#002E6D' }}>
                {box.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SemesterOverviewComponent;
