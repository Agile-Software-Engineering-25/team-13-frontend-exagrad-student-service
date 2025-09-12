import { Box, Divider, Table, Typography , Button} from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';

const ModuleDetailView = () => {
  const { t } = useTranslation();

  type Assessment = {
  assessmentTyp: string;
  weight: string;
  grade: number | "N/A";
  date: string;
  requiresSubmission: boolean;

};

type ModuleInfo = {
    moduleName: string;
    moduleCode: string;
    lecturer: string;
    creditPoints: number;
    grade: number | "N/A";
}

  interface ModuleData {
    moduleInfo: ModuleInfo;
    assessments: Assessment[];
  }

  const moduleProperties = [
    'moduleCode',
    'lecturer',
    'creditPoints',
    'grade',
  ];

  const mockData: Record<string, ModuleData> = {
    '1': {
        moduleInfo:
        {
            moduleName: "Agile Software Engineering",
            moduleCode: "ASE",
            lecturer: "Herr Philipp Ceh",
            creditPoints: 10,
            grade: "N/A"
        },
      assessments: [{
        assessmentTyp: "schriftliche Prüfung",
        weight: "40%",
        grade: "N/A",
        date: "15.10.2025 11:15 Uhr",
        requiresSubmission: false
      },
      {
        assessmentTyp: "WAB",
        weight: "50%",
        grade: "N/A",
        date: "07.10.2025 23:59 Uhr",
        requiresSubmission: true
      },
      {
        assessmentTyp: "Präsentation",
        weight: "10%",
        grade: "N/A",
        date: "17.11.2025 15:00 Uhr",
        requiresSubmission: true
      }

      ]
    },
  };

  const data: ModuleData = mockData['1'];


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
      <Typography level="title-md" padding={2}>
        {data.moduleInfo.moduleName}
      </Typography>
        <Divider inset="none" sx={{ marginBottom: 1 }} />


      <Grid container columnSpacing={4} rowSpacing={5} >
        {moduleProperties.map((key, index) => (
          <Grid xs={2.4} key={index}>
            <Box
              sx={{
                p: 1,
                borderColor: 'neutral.outlinedBorder',
                borderRadius: 'lg',
                textAlign: 'left',
              }}
            >
              <Typography level="title-md" sx={{paddingInline: 2, pt:1}}>
                {data.moduleInfo[key as keyof ModuleInfo]}
              </Typography>
              <Divider/>
              <Typography level="body-sm" sx={{paddingBlock:1, paddingInline:2}}>
                {t(`components.moduleDetailView.moduleProperties.${key}`)}
              </Typography>
            </Box>
          </Grid>
        ))}

        <Grid xs={2.4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button variant="solid" color="primary" fullWidth sx={{p:1.5}}>
                {t('components.moduleDetailView.pubSubmission')}
            </Button>

            <Button variant="solid" color="primary" fullWidth sx={{p:1.5}}>
                {t('components.moduleDetailView.retakeRegistration')}
            </Button>
            </Box>
        </Grid>
      </Grid>

      <Table>
        <thead>
          <tr>
            <th>{t('components.moduleDetailView.table.assessment')}</th>
            <th>{t('components.moduleDetailView.table.weight')}</th>
            <th>{t('components.moduleDetailView.table.grade')}</th>
            <th>{t('components.moduleDetailView.table.date')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.assessments.map((assessment: Assessment, idx: number) => (
            <tr key={idx}>
              <td>{assessment.assessmentTyp}</td>
              <td>{assessment.weight}</td>
              <td>{assessment.grade}</td>
              <td>{assessment.date}</td>
              <td>
                {assessment.requiresSubmission && (
                    <Button size="sm" variant="soft">
                    {t('components.moduleDetailView.table.submit')}
                    </Button>
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </Box>
    
  );
};

export default ModuleDetailView;
