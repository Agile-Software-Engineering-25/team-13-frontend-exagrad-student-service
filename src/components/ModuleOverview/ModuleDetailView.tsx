import { Box, Divider, Table, Typography, Button } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';
import RetakeRegistrationModal from '../Modals/RetakeRegistrationModal/RetakeRegistrationModal';
import { useState } from 'react';
import PubSubmissionModal from '../Modals/PubSubmissionModal/PubSubmissionModal';
import DocumentModal from '../Modals/DocumentModal/DocumentModal';

const ModuleDetailView = () => {
  const { t } = useTranslation();
  const [viewRetakeRegistration, setViewRetakeRegistration] = useState(false);
  const [viewPubSubmission, setViewPubSubmission] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);

  type Assessment = {
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

  const moduleProperties = ['moduleCode', 'lecturer', 'creditPoints', 'grade'];

  const mockData: Record<string, ModuleData> = {
    '1': {
      moduleInfo: {
        moduleName: 'Agile Software Engineering',
        moduleCode: 'ASE',
        lecturer: 'Herr Philipp Ceh',
        creditPoints: 10,
        grade: 'N/A',
      },
      assessments: [
        {
          assessmentTyp: 'schriftliche Prüfung',
          weight: '40%',
          grade: 'N/A',
          date: '15.10.2025 11:15 Uhr',
          requiresSubmission: false,
        },
        {
          assessmentTyp: 'WAB',
          weight: '50%',
          grade: 'N/A',
          date: '07.10.2025 23:59 Uhr',
          requiresSubmission: true,
        },
        {
          assessmentTyp: 'Präsentation',
          weight: '10%',
          grade: 'N/A',
          date: '17.11.2025 15:00 Uhr',
          requiresSubmission: true,
        },
      ],
    },
    '2': {
      moduleInfo: {
        moduleName: 'Interkulturelle Kommunikation und heterogene Teams',
        moduleCode: 'IKHT',
        lecturer: 'Frau Prof. Dr. Rieke Engelhardt',
        creditPoints: 5,
        grade: '1.0',
      },
      assessments: [
        {
          assessmentTyp: 'Präsentation',
          weight: '50%',
          grade: '1.0',
          date: '15.10.2025 11:15 Uhr',
          requiresSubmission: true,
        },
        {
          assessmentTyp: 'Gruppenbericht',
          weight: '50%',
          grade: '1.0',
          date: '07.10.2025 23:59 Uhr',
          requiresSubmission: true,
        },
      ],
    },
  };

  const data: ModuleData = mockData['2'];

  const columnWidths: Record<string, number> = {
    moduleCode: 1.5,
    lecturer: 4,
    creditPoints: 2,
    grade: 2,
  };

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

      <Grid container columnSpacing={4} rowSpacing={5}>
        {moduleProperties.map((key, index) => (
          <Grid xs={columnWidths[key]} key={index}>
            <Box
              sx={{
                p: 1,
                borderColor: 'neutral.outlinedBorder',
                borderRadius: 'lg',
                textAlign: 'left',
              }}
            >
              <Typography level="title-md" sx={{ paddingInline: 2, pt: 1 }}>
                {data.moduleInfo[key as keyof ModuleInfo]}
              </Typography>
              <Divider />
              <Typography
                level="body-sm"
                sx={{ paddingBlock: 1, paddingInline: 2 }}
              >
                {t(`components.moduleDetailView.moduleProperties.${key}`)}
              </Typography>
            </Box>
          </Grid>
        ))}

        <Grid xs={2.5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Button
              variant="solid"
              color="primary"
              fullWidth
              sx={{ p: 1.5 }}
              onClick={() => setViewPubSubmission(true)}
            >
              {t('components.moduleDetailView.pubSubmission')}
            </Button>

            <Button
              variant="solid"
              color="primary"
              fullWidth
              sx={{ p: 1.5 }}
              onClick={() => setViewRetakeRegistration(true)}
            >
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
                  <Button
                    size="sm"
                    variant="soft"
                    onClick={() => setViewDocuments(true)}
                  >
                    {t('components.moduleDetailView.table.submit')}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <RetakeRegistrationModal
        open={viewRetakeRegistration}
        setOpen={setViewRetakeRegistration}
      />
      <PubSubmissionModal
        open={viewPubSubmission}
        setOpen={setViewPubSubmission}
      />
      <DocumentModal open={viewDocuments} setOpen={setViewDocuments} />
    </Box>
  );
};

export default ModuleDetailView;
