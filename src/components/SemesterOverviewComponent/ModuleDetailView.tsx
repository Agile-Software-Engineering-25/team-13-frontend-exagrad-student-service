import { Box, Divider, Typography, Button, Grid } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import RetakeRegistrationModal from '../Modals/RetakeRegistrationModal/RetakeRegistrationModal';
import { useState } from 'react';
import PubUploadModal from '../Modals/PubUploadModal/PubUploadModal';
import AssessmentTable from './AssessmentTable';

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
        p: 3,
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
                level="body-md"
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

      <AssessmentTable selectedModuleData={props.selectedModuleData} />

      <RetakeRegistrationModal
        open={viewRetakeRegistration}
        setOpen={setViewRetakeRegistration}
      />
      <PubUploadModal
        open={viewPubSubmission}
        setOpen={setViewPubSubmission}
        studentId="123"
      />
    </Box>
  );
};

export default ModuleDetailView;
