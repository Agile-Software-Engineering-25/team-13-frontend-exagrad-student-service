import { Box, Divider, Typography, Button, Grid } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PubUploadModal from '../Modals/PubUploadModal/PubUploadModal';
import AssessmentTable from './AssessmentTable';

type Assessment = {
  id: string;
  moduleCode: string;
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
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

const ModuleDetailView = (props: { selectedModuleData: ModuleData }) => {
  const { t } = useTranslation();
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
        p: { xs: 1, sm: 2, md: 2, xl: 3 },
      }}
    >
      <Grid
        container
        columnSpacing={{ xs: 2, sm: 2, md: 3, xl: 4 }}
        rowSpacing={{ xs: 3, sm: 3, md: 4, xl: 5 }}
      >
        {moduleProperties.map((key, index) => (
          <Grid md={columnWidths[key]} key={index}>
            <Box
              sx={{
                p: { xs: 0.5, sm: 1, md: 1.5 },
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

        <Grid container md={2.5} xs={2.5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { sm: 'column', xs: 'row' },
              gap: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="solid"
              color="primary"
              fullWidth
              sx={{
                p: { xs: 0.5, sm: 1, md: 1.5 },
                overflowWrap: 'anywhere',
                minWidth: 150,
                maxHeight: 60,
              }}
              onClick={() => setViewPubSubmission(true)}
            >
              {t('components.moduleDetailView.pubSubmission')}
            </Button>

            <Button
              variant="solid"
              color="primary"
              fullWidth
              sx={{
                p: { xs: 0.5, sm: 1, md: 1.5 },
                overflowWrap: 'anywhere',
                minWidth: 150,
                maxHeight: 60,
              }}
              // TODO: set onClick to navigate to the retake registration page for the current module
            >
              {t('components.moduleDetailView.retakeRegistration')}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <AssessmentTable selectedModuleData={props.selectedModuleData} />
      </Box>

      {/* TODO : remove mock data */}
      <PubUploadModal
        open={viewPubSubmission}
        setOpen={setViewPubSubmission}
        studentId="123"
      />
    </Box>
  );
};

export default ModuleDetailView;
