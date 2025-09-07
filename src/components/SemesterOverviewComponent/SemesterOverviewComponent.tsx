import { Box, Grid, Typography, Button, AccordionGroup, Accordion, AccordionDetails, AccordionSummary } from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; //npm install @mui/icons-material @mui/material @emotion/styled @emotion/react to make it run
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SemesterOverviewComponent = () => {
  const { t } = useTranslation();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);

  //Schrift (größe,...) anpassen wenn Theme da ist

  const semester1MockData: Record<string, SemesterData> = {
    '1': {
      name: 'Mathematik 1',
      name2: 'Sprachkompetenz Englisch',
      name3: 'Grundlagen der Informatik',
      name4: 'Lerntechniken und wissenschaftliches Arbeiten',
      name5: 'Programmierung',
    }
  };

  const semester2MockData: Record<string, SemesterData> = {
    '1': {
      name: 'Algorithmen und Datenstrukturen',
      name2: 'Fortgeschrittene Programmierung',
      name3: 'Kommunikationskompetenz',
      name4: 'Mathematik 2',
      name5: 'Theoretische Informatik',
    }
  };

  const semester3MockData: Record<string, SemesterData> = {
    '1': {
      name: 'Betriebssysteme',
      name2: 'Datenmodellierung und Datenbanken',
      name3: 'Informationssicherheit',
      name4: 'Netze und verteilte Systeme',
      name5: 'Projektmanagement',
    }
  };

  const semester4MockData: Record<string, SemesterData> = {
    '1': {
      name: 'Agile Software Engineering und Softwaretechnik',
      name2: 'Data Analytics & Big Data',
      name3: 'Human-Computer-Interaction',
      name4: 'Interkulturelle Kommunikation und heterogene Teams',
      name5: 'Technische Informatik und Rechnerarchitekturen und XAAS',
    }
  };

  const semester5MockData: Record<string, SemesterData> = {
    '1': {
      name: 'Betriebswirtschaftslehre und IT-Service-Management',
      name2: 'Künstliche Intelligenz und Maschinelles Lernen',
      name3: 'Software Anwendungsarchitekturen und Microservice APIs',
      name4: 'Projektpraktikum',
      name5: 'Wahlpflichtmodul: Mobile Anwendungen',
    }
  };

  const semester6MockData: Record<string, SemesterData> = {
    '1': {
      name: 'Bachelor-Thesis',
      name2: 'Präsentation zur Bachelor-Thesis',
      name3: 'New Trends in IT und Management der Digitalen Transformation',
      name4: 'Recht und Datenschutz',
      name5: 'empty'
    }
  };

  const semester1 = semester1MockData['1']
  const semester2 = semester2MockData['1']
  const semester3 = semester3MockData['1']
  const semester4 = semester4MockData['1']
  const semester5 = semester5MockData['1']
  const semester6 = semester6MockData['1']

  const semesterBoxes = [
    {id: 1, title: <Typography>{t(`components.semesterOverview.semesters.firstSemester`)}</Typography>, Data: semester1MockData},
    {id: 2, title: <Typography>{t(`components.semesterOverview.semesters.secondSemester`)}</Typography>},
    {id: 3, title: <Typography>{t(`components.semesterOverview.semesters.thirdSemester`)}</Typography>},
    {id: 4, title: <Typography>{t(`components.semesterOverview.semesters.fourthSemester`)}</Typography>},
    {id: 5, title: <Typography>{t(`components.semesterOverview.semesters.fifthSemester`)}</Typography>},
    {id: 6, title: <Typography>{t(`components.semesterOverview.semesters.sixthSemester`)}</Typography>}               
  ]

  interface SemesterData {
    name: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
  }

  //remembers which semesterBox has been clicked and shows the ModuleOverview for that semester, has a "back"-Button to go back to semesterOverview
  if (selectedBox !== null) {
      const box = semesterBoxes.find((b) => b.id === selectedBox)!;

    return (
      <Box 
        sx={{
          pl: '250px',
          pr: '250px',
        }}
      >

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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              pt: '8px'
            }}
          >
            {/*make it be on same line as Kasten-Überschrift*/}
            {/*Anpassen wenn shared components*/}
            <Button 
              //add padding somehow, button isnt correctly styled either
              startDecorator={<ArrowBackIosNewIcon />}
              size='md'
              sx={{
                width:'170px',
                height:'40px'
              }}
              onClick={() => setSelectedBox(null)}
            >
              <Typography level="body-sm" padding={2} sx={{color: '#FFFFFF'}}>
                {t('components.moduleOverview.buttons.back')}
              </Typography>
            </Button>
          </Box>

          <Typography level="h3" padding={2}>
            {box.title}
          </Typography>
          {/*maybe use accordion here? didnt really function tho*/}^

          <AccordionGroup 
            sx={{ 
              background: '#FFFFFF',
              borderRadius: '14px',
              flexGrow: 1 
            }}
          >
            {box.id === 1 ? (
              Object.values(semester1).map((moduleName, i) => (
                <Accordion key={i}>
                  <AccordionSummary>
                    <Typography level="h4" sx={{ color: "#00122B" }}>
                      {moduleName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              ))
            ) : null} 
            {box.id === 2 ? (
              Object.values(semester2).map((moduleName, i) => (
                <Accordion key={i}>
                  <AccordionSummary>
                    <Typography level="h4" sx={{ color: "#00122B" }}>
                      {moduleName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              ))
            ) : null} 
            {box.id === 3 ? (
              Object.values(semester3).map((moduleName, i) => (
                <Accordion key={i}>
                  <AccordionSummary>
                    <Typography level="h4" sx={{ color: "#00122B" }}>
                      {moduleName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              ))
            ) : null} 
            {box.id === 4 ? (
              Object.values(semester4).map((moduleName, i) => (
                <Accordion key={i}>
                  <AccordionSummary>
                    <Typography level="h4" sx={{ color: "#00122B" }}>
                      {moduleName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              ))
            ) : null} 
            {box.id === 5 ? (
              Object.values(semester5).map((moduleName, i) => (
                <Accordion key={i}>
                  <AccordionSummary>
                    <Typography level="h4" sx={{ color: "#00122B" }}>
                      {moduleName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              ))
            ) : null} 
            {box.id === 6 ? (
              Object.values(semester6).map((moduleName, i) => (
                <Accordion key={i}>
                  <AccordionSummary>
                    <Typography level="h4" sx={{ color: "#00122B" }}>
                      {moduleName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                  </AccordionDetails>
                </Accordion>
              ))
            ) : null} 
          </AccordionGroup>

        </Box>
      </Box>
    );
  }

  return (
    <Box 
      sx={{
        pl: '250px',
        pr: '250px'
      }}
    >
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
        <Typography level='h3' padding={2} sx={{ color: '#00122B' }}>
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
                      }
                }}
                onClick={() => setSelectedBox(box.id)}
              >
                <Typography level="h4" sx={{ color: '#002E6D' }}>
                    {box.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default SemesterOverviewComponent;
