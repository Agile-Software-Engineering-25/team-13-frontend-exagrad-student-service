//import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import { Box, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';

const SemesterOverviewComponent = () => {
  const { t } = useTranslation();

  return (
    <Box
        sx={{
            pl: 4,
            pr: 4,
            pb: 4,
            border: '2px solid #002E6D',
            borderRadius: 30,
        }}
    >
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs>
                <Box
                    sx={{
                    p: 2,
                    border: '2px solid #CECECE',
                    borderRadius: 14,
                    textAlign: 'center',
                    //boxShadow: "0px 4px 4px rgba(0,0,0,0.2)"
                    }}
                    //onHover={() => boxShadow: "0px 4px 12px rgba(0,0,0,0.4)"}
                >
                    <Typography level="body-md">
                        {t(`pages.home.semesters.firstSemester`)}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs>
                <Box
                    sx={{
                    p: 2,
                    border: '2px solid #CECECE',
                    borderRadius: 14,
                    textAlign: 'center',
                    }}
                >
                    <Typography level="body-md">
                        {t(`pages.home.semesters.secondSemester`)}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs>
                <Box
                    sx={{
                    p: 2,
                    border: '2px solid #CECECE',
                    borderRadius: 14,
                    textAlign: 'center',
                    }}
                >
                    <Typography level="body-md">
                        {t(`pages.home.semesters.thirdSemester`)}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs>
                <Box
                    sx={{
                    p: 2,
                    border: '2px solid #CECECE',
                    borderRadius: 14,
                    textAlign: 'center',
                    //boxShadow: "0px 4px 4px rgba(0,0,0,0.2)"
                    }}
                    //onHover={() => boxShadow: "0px 4px 12px rgba(0,0,0,0.4)"}
                >
                    <Typography level="body-md">
                        {t(`pages.home.semesters.fourthSemester`)}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs>
                <Box
                    sx={{
                    p: 2,
                    border: '2px solid #CECECE',
                    borderRadius: 14,
                    textAlign: 'center',
                    }}
                >
                    <Typography level="body-md">
                        {t(`pages.home.semesters.fifthSemester`)}
                    </Typography>
                </Box>
            </Grid>
            <Grid xs>
                <Box
                    sx={{
                    p: 2,
                    border: '2px solid #CECECE',
                    borderRadius: 14,
                    textAlign: 'center',
                    }}
                >
                    <Typography level="body-md">
                        {t(`pages.home.semesters.sixthSemester`)}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
  );
};

export default SemesterOverviewComponent;
