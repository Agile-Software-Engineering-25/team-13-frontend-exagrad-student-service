import { useState } from 'react';
import { Box, Button } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import StudentInfoHeader from '@/components/StudentInfoHeader/StudentInfoHeader';
import SemesterOverviewComponent from '@/components/SemesterOverviewComponent/SemesterOverviewComponent';
import ModuleOverviewComponent from '@/components/SemesterOverviewComponent/ModuleOverviewComponent';
import { useUser } from '@/hooks/useUser';
import { useTypedSelector } from '@/stores/rootReducer';

import { downloadPdf } from '@/services/pdf/performanceOverviewGenerator';

const Home = () => {
  const { t } = useTranslation();
  const { getUserId, getFirstName, getLastName } = useUser();
  const feedbacks = useTypedSelector(
    (state) => state.lecturerFeedback.data.feedbacks
  );
  const courses = useTypedSelector((state) => state.courses.data.courses);

  const [selectedSemester, setSelectedSemester] = useState<{
    id: number | null;
    titleKey: string | null;
  }>({ id: null, titleKey: null });

  const handleDownloadPdf = async () => {
    const studentInfo = {
      firstName: getFirstName(),
      lastName: getLastName(),
      userId: getUserId(),
    };

    if (!feedbacks || feedbacks.length === 0) {
      alert(t('pages.home.errors.noFeedbackData'));
      return;
    }

    await downloadPdf(feedbacks, studentInfo, { courses });
  };

  return (
    <Box
      sx={{
        paddingInline: { xl: 15, md: 5, sm: 3, xs: 1.5 },
        paddingBlock: 2,
        mx: 'auto',
      }}
    >
      <StudentInfoHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-end', xs: 'center' },
          mt: 3,
          gap: 2,
        }}
      >
        <Button variant="solid" onClick={handleDownloadPdf}>
          {t('pages.home.buttons.downloadPerformanceOverview')}
        </Button>
      </Box>
      <Box sx={{ mt: 4 }}>
        {selectedSemester.id === null ? (
          <SemesterOverviewComponent
            setSelectedSemester={setSelectedSemester}
          />
        ) : (
          <ModuleOverviewComponent
            selectedSemester={selectedSemester}
            setSelectedSemester={setSelectedSemester}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
