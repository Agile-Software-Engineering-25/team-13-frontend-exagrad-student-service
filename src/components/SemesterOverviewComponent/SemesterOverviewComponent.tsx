import { Box, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AccordionGroup, Accordion, AccordionDetails, AccordionSummary } from '@mui/joy';

const SemesterOverviewComponent = () => {
    const { t } = useTranslation();
    const [selectedBox, setSelectedBox] = useState<number | null>(null);

    const semesterBoxes = [
        {id: 1, title: <Typography>{t(`pages.home.semesterOverview.semesters.firstSemester`)}</Typography>},
        {id: 2, title: <Typography>{t(`pages.home.semesterOverview.semesters.secondSemester`)}</Typography>},
        {id: 3, title: <Typography>{t(`pages.home.semesterOverview.semesters.thirdSemester`)}</Typography>},
        {id: 4, title: <Typography>{t(`pages.home.semesterOverview.semesters.fourthSemester`)}</Typography>},
        {id: 5, title: <Typography>{t(`pages.home.semesterOverview.semesters.fifthSemester`)}</Typography>},
        {id: 6, title: <Typography>{t(`pages.home.semesterOverview.semesters.sixthSemester`)}</Typography>}               
    ]

    //remembers which semesterBox has been clicked and shows the ModuleOverview for that semester, has a "back"-Button to go back to semesterOverview
    if (selectedBox !== null) {
        const box = semesterBoxes.find((b) => b.id === selectedBox)!;
        const [accordionIndex, setAccordionIndex] = useState<number | null>(0);

        return (
            <Box 
                sx={{
                    p: 2
                }}
            >
                <button 
                    //add padding somehow, button isnt correctly styled either
                    onClick={() => setSelectedBox(null)}
                >
                    ⬅ Back
                </button>
                <Box
                    sx={{
                        pl: 4,
                        pr: 4,
                        pb: 4,
                        pt: 1,
                        height: 190,
                        border: '2px solid #002E6D',
                        borderRadius: 30,
                        display: 'flex',
                        flexDirection: "column",
                        justifyContent: 'center',
                    }}
                >
                    <Typography level="h3" padding={2}>
                        {box.title}
                    </Typography>
                    {/*maybe use accordion here? didnt really function tho*/}
                    
                    <p>Details for Box {box.id}</p>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                pl: 4,
                pr: 4,
                pb: 4,
                pt: 1,
                height: 190,
                border: '2px solid #002E6D',
                borderRadius: 30,
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
            }}
        >
            <Typography level="h3" padding={2}>
                {t('pages.home.semesterOverview.title')}
            </Typography>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                {semesterBoxes.map((box, i) => (
                    <Grid xs={4} key={i}>
                        <Box
                            sx={{
                                p: 2,
                                border: '2px solid #CECECE',
                                borderRadius: 14,
                                textAlign: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: '0px 4px 4px rgba(0,0,0,0.2)',
                                }
                            }}
                            onClick={() => setSelectedBox(box.id)}
                        >
                            <Typography level="body-md">
                                {box.title}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default SemesterOverviewComponent;
