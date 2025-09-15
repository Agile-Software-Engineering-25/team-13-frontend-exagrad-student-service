import { Box, Divider, Table, Typography, Button } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';
import RetakeRegistrationModal from '../Modals/RetakeRegistrationModal/RetakeRegistrationModal';
import { useState } from 'react';
import PubSubmissionModal from '../Modals/PubSubmissionModal/PubSubmissionModal';
import DocumentModal from '../Modals/DocumentModal/DocumentModal';

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

const ModuleDetailView = (props: { selectedModuleData: ModuleData }) => {
  const { t } = useTranslation();
  const [viewRetakeRegistration, setViewRetakeRegistration] = useState(false);
  const [viewPubSubmission, setViewPubSubmission] = useState(false);
  const [viewDocuments, setViewDocuments] = useState(false);

  const moduleProperties = ['moduleCode', 'lecturer', 'creditPoints', 'grade'];

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
      }}
    >
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
                {props.selectedModuleData.moduleInfo[key as keyof ModuleInfo]}
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
          {props.selectedModuleData.assessments.map(
            (assessment: Assessment, idx: number) => (
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
            )
          )}
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
