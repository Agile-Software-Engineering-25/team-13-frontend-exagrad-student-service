import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import StudentInfoHeader from '@/components/StudentInfoHeader/StudentInfoHeader';
import SemesterOverviewComponent from '@/components/SemesterOverviewComponent/SemesterOverviewComponent';
import ModuleOverviewComponent from '@/components/SemesterOverviewComponent/ModuleOverviewComponent';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useUser } from '@/hooks/useUser';
import { useTypedSelector } from '@/stores/rootReducer';
import useCombinedStudentData from '@/hooks/useCombinedStudentData';

import { downloadPdf } from '@/services/pdf/performanceOverviewGenerator';

const Home = () => {
  const { t } = useTranslation();
  const { getUserId, getFirstName, getLastName } = useUser();
  const { fetchAndStoreCombinedData } = useCombinedStudentData();
  const feedbacks = useTypedSelector(
    (state) => state.lecturerFeedback.data.feedbacks
  );
  const courses = useTypedSelector((state) => state.courses.data.courses);
  const coursesLoading = useTypedSelector(
    (state) => state.courses.state === 'loading'
  );

  const [selectedSemester, setSelectedSemester] = useState<{
    id: number | null;
    titleKey: string | null;
  }>({ id: null, titleKey: null });

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Prevent repeated loading spinner flicker: only fetch once when userId is available and no courses cached
    const userId = getUserId();
    if (!userId) return; // wait for user
    if (courses.length > 0) {
      if (isInitialLoading) setIsInitialLoading(false); // mark initial load done if data already present
      return; // skip refetch if we already have courses
    }
    const initializeData = async () => {
      try {
        await fetchAndStoreCombinedData(userId);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };
    initializeData();
  }, [fetchAndStoreCombinedData, getUserId, courses.length, isInitialLoading]);

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

  // Show single loading spinner during initial data fetch
  if (isInitialLoading || coursesLoading) {
    return <LoadingSpinner message={t('common.loading') || 'Loading...'} />;
  }

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
