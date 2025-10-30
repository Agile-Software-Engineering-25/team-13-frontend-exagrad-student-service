import { Box, Typography, IconButton } from '@mui/joy';
import { Accordion } from '@agile-software/shared-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';
import ModuleDetailView from './ModuleDetailView';
import { useEffect, useState } from 'react';
import type { ExamDataResponse } from '@/@custom-types/examData';
import useExamDataApi from '@/hooks/useExamDataApi';

type Semester = {
  id: number | null;
  titleKey: string | null;
};

type Assessment = {
  id: string;
  moduleCode: string;
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
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

  const { getAllExams } = useExamDataApi();
  //const [assessmentData, setAssesmentData] = useState<Assessment[]>([]);

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
        assessments: [],
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
        assessments: [],
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

  const [semesterData, setSemesterData] =
    useState<Record<number, SemesterData>>(semesterMockData);

  const formatExamType = (type: string) => {
    const formatted =
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

    const newFormatted = formatted
      .replace(/ae/g, 'ä')
      .replace(/oe/g, 'ö')
      .replace(/ue/g, 'ü');

    return newFormatted;
  };

  const formatDateTime = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const allExams: ExamDataResponse[] = (await getAllExams()) || [];

        if (!Array.isArray(allExams)) {
          console.error('getAllExams returned not an array:', allExams);
          return;
        }

        const mappedAssessments: Assessment[] = allExams.map((exam) => ({
          id: exam.id,
          moduleCode: exam.moduleCode,
          assessmentTyp: formatExamType(exam.examType),
          weight: 'N/A',
          grade: 'N/A',
          date: formatDateTime(exam.examDate),
          requiresSubmission: exam.fileUploadRequired,
        }));

        const updatedMockData = { ...semesterMockData };

        Object.values(updatedMockData).forEach((modules) => {
          Object.values(modules).forEach((moduleData) => {
            moduleData.assessments = [];
            const relatedAssessments = mappedAssessments.filter(
              (a) => a.moduleCode === moduleData.moduleInfo.moduleCode
            );
            if (relatedAssessments.length > 0) {
              moduleData.assessments = [
                ...moduleData.assessments,
                ...relatedAssessments,
              ];
            }
          });
        });

        //setAssesmentData(mappedAssessments);
        console.log('Merged mock data with assessments:', updatedMockData);

        setSemesterData(updatedMockData);
      } catch (err) {
        console.error('Error fetching exams:', err);
      }
    };

    fetchExams();
  }, []);

  const currentSemester = semesterData[props.selectedSemester.id ?? 0];

  return (
    <Box
      sx={{
        pl: { xs: 2, sm: 2, md: 3, xl: 4 },
        pr: { xs: 2, sm: 2, md: 3, xl: 4 },
        pb: { xs: 2, sm: 2, md: 3, xl: 4 },
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
