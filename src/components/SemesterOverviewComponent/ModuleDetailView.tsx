import { Box, Divider, Typography, Button, Grid } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import PubUploadModal from '../Modals/PubUploadModal/PubUploadModal';
import AssessmentTable from './AssessmentTable';
import { useNavigate } from 'react-router';

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

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/antrag/?accordion=nachklausur/' + props.selectedModuleData.moduleInfo.moduleCode);
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
              // onClick={() => setViewRetakeRegistration(true)}
              onClick={handleRegister}
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

      {/* <RetakeRegistrationModal
        open={viewRetakeRegistration}
        setOpen={setViewRetakeRegistration}
      /> */}
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
