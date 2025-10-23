import { Box, Typography, IconButton } from '@mui/joy';
import { Accordion } from '@agile-software/shared-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';
import ModuleDetailView from './ModuleDetailView';

//needs accordion component, couldnt make it work with the header as of now

type Semester = {
  id: number | null;
  titleKey: string | null;
};

type Assessment = {
  id: string;
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
  examId?: string;
  deadline?: string;
};

type ModuleInfo = {
  moduleName: string;
  moduleCode: string;
  lecturer: string;
  creditPoints: number;
  grade: string | 'N/A';
};

interface ModuleData {
  moduleInfo: ModuleInfo;
  assessments: Assessment[];
}

type SemesterData = Record<string, ModuleData>;

const ModuleOverviewComponent = (props: {
  selectedSemester: Semester;
  setSelectedSemester: React.Dispatch<React.SetStateAction<Semester>>;
}) => {
  const { t } = useTranslation();

  const semesterMockData: Record<number, SemesterData> = {
    1: {
      '1': {
        moduleInfo: {
          moduleName: 'Mathematik 1',
          moduleCode: 'MATH1',
          lecturer: 'Prof. Müller',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '2': {
        moduleInfo: {
          moduleName: 'Sprachkompetenz Englisch',
          moduleCode: 'ENG1',
          lecturer: 'Dr. Schmidt',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '3': {
        moduleInfo: {
          moduleName: 'Grundlagen der Informatik',
          moduleCode: 'INFO1',
          lecturer: 'Prof. Weber',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '4': {
        moduleInfo: {
          moduleName: 'Lerntechniken und wissenschaftliches Arbeiten',
          moduleCode: 'LWA',
          lecturer: 'Dr. Hoffmann',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '5': {
        moduleInfo: {
          moduleName: 'Programmierung',
          moduleCode: 'PROG1',
          lecturer: 'Prof. Fischer',
          creditPoints: 10,
          grade: 'N/A',
        },
        assessments: [],
      },
    },

    2: {
      '1': {
        moduleInfo: {
          moduleName: 'Algorithmen und Datenstrukturen',
          moduleCode: 'ADS',
          lecturer: 'Prof. Keller',
          creditPoints: 10,
          grade: 'N/A',
        },
        assessments: [],
      },
      '2': {
        moduleInfo: {
          moduleName: 'Fortgeschrittene Programmierung',
          moduleCode: 'PROG2',
          lecturer: 'Dr. Lange',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '3': {
        moduleInfo: {
          moduleName: 'Kommunikationskompetenz',
          moduleCode: 'KOMM',
          lecturer: 'Dr. Lehmann',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '4': {
        moduleInfo: {
          moduleName: 'Mathematik 2',
          moduleCode: 'MATH2',
          lecturer: 'Prof. Schneider',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '5': {
        moduleInfo: {
          moduleName: 'Theoretische Informatik',
          moduleCode: 'TI',
          lecturer: 'Prof. Braun',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
    },

    3: {
      '1': {
        moduleInfo: {
          moduleName: 'Betriebssysteme',
          moduleCode: 'OS',
          lecturer: 'Prof. Schulz',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '2': {
        moduleInfo: {
          moduleName: 'Datenmodellierung und Datenbanken',
          moduleCode: 'DB',
          lecturer: 'Dr. Zimmermann',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '3': {
        moduleInfo: {
          moduleName: 'Informationssicherheit',
          moduleCode: 'SEC',
          lecturer: 'Prof. Richter',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '4': {
        moduleInfo: {
          moduleName: 'Netze und verteilte Systeme',
          moduleCode: 'NET',
          lecturer: 'Dr. Wolf',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '5': {
        moduleInfo: {
          moduleName: 'Projektmanagement',
          moduleCode: 'PM',
          lecturer: 'Dr. Becker',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
    },

    4: {
      '1': {
        moduleInfo: {
          moduleName: 'Agile Software Engineering und Softwaretechnik',
          moduleCode: 'ASE',
          lecturer: 'Herr Philipp Ceh',
          creditPoints: 10,
          grade: 'N/A',
        },
        assessments: [
          {
            id: 'ase-written-2025',
            assessmentTyp: 'schriftliche Prüfung',
            weight: '40%',
            grade: 'N/A',
            date: '15.10.2025 11:15 Uhr',
            requiresSubmission: false,
          },
          {
            id: 'exam-ase-wab-2025',
            assessmentTyp: 'WAB',
            weight: '50%',
            grade: 'N/A',
            date: '07.10.2025 23:59 Uhr',
            requiresSubmission: true,
            examId: 'exam-ase-wab-2025',
            deadline: '2025-10-07T23:59:00',
          },
          {
            id: 'exam-ase-presentation-2025',
            assessmentTyp: 'Präsentation',
            weight: '10%',
            grade: 'N/A',
            date: '17.11.2025 15:00 Uhr',
            requiresSubmission: true,
            examId: 'exam-ase-presentation-2025',
            deadline: '2025-11-17T15:00:00',
          },
        ],
      },
      '2': {
        moduleInfo: {
          moduleName: 'Data Analytics & Big Data',
          moduleCode: 'DABD',
          lecturer: 'Dr. Wagner',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '3': {
        moduleInfo: {
          moduleName: 'Human-Computer-Interaction',
          moduleCode: 'HCI',
          lecturer: 'Dr. Franke',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '4': {
        moduleInfo: {
          moduleName: 'Interkulturelle Kommunikation und heterogene Teams',
          moduleCode: 'IKHT',
          lecturer: 'Frau Prof. Dr. Rieke Engelhardt',
          creditPoints: 5,
          grade: '1.0',
        },
        assessments: [
          {
            id: 'exam-ikht-presentation-2025',
            assessmentTyp: 'Präsentation',
            weight: '50%',
            grade: '1.0',
            date: '15.10.2025 11:15 Uhr',
            requiresSubmission: true,
            examId: 'exam-ikht-presentation-2025',
            deadline: '2025-10-15T11:15:00',
          },
          {
            id: 'exam-ikht-report-2025',
            assessmentTyp: 'Gruppenbericht',
            weight: '50%',
            grade: '1.0',
            date: '07.09.2025 23:59 Uhr',
            requiresSubmission: true,
            examId: 'exam-ikht-report-2025',
            deadline: '2025-09-07T23:59:00',
          },
        ],
      },
      '5': {
        moduleInfo: {
          moduleName: 'Technische Informatik und Rechnerarchitekturen und XAAS',
          moduleCode: 'TIRA',
          lecturer: 'Prof. Krüger',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
    },

    5: {
      '1': {
        moduleInfo: {
          moduleName: 'Betriebswirtschaftslehre und IT-Service-Management',
          moduleCode: 'BWLIT',
          lecturer: 'Dr. Peters',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '2': {
        moduleInfo: {
          moduleName: 'Künstliche Intelligenz und Maschinelles Lernen',
          moduleCode: 'KIML',
          lecturer: 'Prof. Neumann',
          creditPoints: 10,
          grade: 'N/A',
        },
        assessments: [],
      },
      '3': {
        moduleInfo: {
          moduleName: 'Software Anwendungsarchitekturen und Microservice APIs',
          moduleCode: 'SAAM',
          lecturer: 'Dr. Groß',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '4': {
        moduleInfo: {
          moduleName: 'Projektpraktikum',
          moduleCode: 'PRAK',
          lecturer: 'Prof. Sommer',
          creditPoints: 10,
          grade: 'N/A',
        },
        assessments: [],
      },
      '5': {
        moduleInfo: {
          moduleName: 'Wahlpflichtmodul: Mobile Anwendungen',
          moduleCode: 'MOBAPP',
          lecturer: 'Dr. Klein',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
    },

    6: {
      '1': {
        moduleInfo: {
          moduleName: 'Bachelor-Thesis',
          moduleCode: 'BA',
          lecturer: 'Betreuer: nach Wahl',
          creditPoints: 15,
          grade: 'N/A',
        },
        assessments: [],
      },
      '2': {
        moduleInfo: {
          moduleName: 'Präsentation zur Bachelor-Thesis',
          moduleCode: 'BA-PRES',
          lecturer: 'Betreuer: nach Wahl',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '3': {
        moduleInfo: {
          moduleName:
            'New Trends in IT und Management der Digitalen Transformation',
          moduleCode: 'NTIT',
          lecturer: 'Dr. Vogel',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
      '4': {
        moduleInfo: {
          moduleName: 'Recht und Datenschutz',
          moduleCode: 'LAW',
          lecturer: 'Prof. Schwarz',
          creditPoints: 5,
          grade: 'N/A',
        },
        assessments: [],
      },
    },
  };

  const currentSemester = semesterMockData[props.selectedSemester.id ?? 0];

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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          pt: '8px',
          alignItems: 'center',
        }}
      >
        <IconButton
          size="md"
          onClick={() =>
            props.setSelectedSemester({ id: null, titleKey: null })
          }
          variant="solid"
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography level="h3" padding={2}>
          {props.selectedSemester.titleKey
            ? t(props.selectedSemester.titleKey)
            : ''}
        </Typography>
      </Box>
      {/* Use shared Accordion component */}
      {currentSemester && (
        <Accordion
          items={Object.values(currentSemester).map((moduleData, i) => ({
            id: `${i}`,
            header: moduleData.moduleInfo.moduleName,
            children: <ModuleDetailView selectedModuleData={moduleData} />,
          }))}
          multiple={false}
          defaultExpanded={[]}
          accordionGroupSX={{
            background: '#FFFFFF',
            borderRadius: '14px',
            flexGrow: 1,
          }}
          headerSX={{ color: '#00122B' }}
        />
      )}
    </Box>
  );
};

export default ModuleOverviewComponent;
