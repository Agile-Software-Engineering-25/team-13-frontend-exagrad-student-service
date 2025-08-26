import { Box, Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';

const StudentInfoHeader = () => {
  const { t } = useTranslation(); // use t instead of i18n since you aren’t using i18n directly

  return (
    <Box 
    sx={{
        p: 4,                       
        border: '2px solid',        
        borderColor: 'neutral.outlinedBorder', 
        borderRadius: 'xl',      
      }}>
        Dein Status
        <Grid container columnSpacing={6} rowSpacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=8</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=4</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=4</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=8</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=8</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=4</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=4</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=8</Typography>
                </Box>
            </Grid>
            <Grid xs={2.4}>
                <Box sx={{ p: 2, bgcolor: 'neutral.softBg', borderRadius: 'sm' }}>
                <Typography level="body-md">xs=8</Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
  );
};

export default StudentInfoHeader;
