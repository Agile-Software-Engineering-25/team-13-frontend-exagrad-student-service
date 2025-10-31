import { Box, Grid, Typography } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useExamDataApi from '@/hooks/useExamDataApi';
import { useUser } from '@/hooks/useUser';
import { useTypedSelector } from '@stores/rootReducer';
import {
  setCourses,
  setLoading as setCoursesLoading,
  setError,
} from '@stores/slices/coursesSlice';

const SemesterOverviewComponent = (props: {
  setSelectedSemester: (semester: {
    id: number | null;
    titleKey: string | null;
  }) => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getAllCourses } = useExamDataApi();
  const { getUserId } = useUser();

  const coursesState = useTypedSelector((state) => state.courses);
  const { courses, lastFetched } = coursesState.data;
  const loading = coursesState.state === 'loading';

  const [availableSemesters, setAvailableSemesters] = useState<number[]>([]);

  const semesterBoxes = [
    {
      id: 1,
      title: `components.semesterOverview.semesters.firstSemester`,
    },
    {
      id: 2,
      title: `components.semesterOverview.semesters.secondSemester`,
    },
    {
      id: 3,
      title: `components.semesterOverview.semesters.thirdSemester`,
    },
    {
      id: 4,
      title: `components.semesterOverview.semesters.fourthSemester`,
    },
    {
      id: 5,
      title: `components.semesterOverview.semesters.fifthSemester`,
    },
    {
      id: 6,
      title: `components.semesterOverview.semesters.sixthSemester`,
    },
  ];

  useEffect(() => {
    const studentId = getUserId();
    if (!studentId) {
      return;
    }

    // Check if we already have courses in Redux
    if (courses.length > 0 && lastFetched) {
      const semesterIds = new Set<number>();
      courses.forEach((course) => {
        semesterIds.add(course.semester);
      });
      setAvailableSemesters(Array.from(semesterIds).sort((a, b) => a - b));
      return;
    }

    const fetchAvailableSemesters = async () => {
      try {
        dispatch(setCoursesLoading());
        const allCourses = await getAllCourses();

        if (!Array.isArray(allCourses)) {
          console.error('getAllCourses returned not an array:', allCourses);
          dispatch(setError('Invalid response format'));
          return;
        }

        dispatch(setCourses(allCourses));

        const semesterIds = new Set<number>();
        allCourses.forEach((course) => {
          semesterIds.add(course.semester);
        });

        setAvailableSemesters(Array.from(semesterIds).sort((a, b) => a - b));
      } catch (err) {
        console.error('Error fetching courses:', err);
        dispatch(
          setError(err instanceof Error ? err.message : 'Unknown error')
        );
      }
    };

    fetchAvailableSemesters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserId(), courses.length]);

  if (loading) {
    return (
      <Box
        sx={{
          p: 3,
          background: '#F3F8FF',
          borderRadius: 30,
          textAlign: 'center',
        }}
      >
        <Typography level="body-md">
          {t('common.loading') || 'Loading...'}
        </Typography>
      </Box>
    );
  }

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
      <Typography level="h3" padding={2} sx={{ color: '#00122B' }}>
        {t('components.semesterOverview.title')}
      </Typography>

      <Grid container columnSpacing={4} rowSpacing={2} sx={{ flexGrow: 1 }}>
        {semesterBoxes
          .filter((box) => availableSemesters.includes(box.id))
          .map((box, i) => (
            <Grid md={4} sm={6} xs={12} key={i}>
              <Box
                sx={{
                  p: 2,
                  background: '#FFFFFF',
                  border: '2px solid #C2CAD5',
                  borderRadius: 14,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0px 4px 4px rgba(0,0,0,0.2)',
                  },
                }}
                onClick={() =>
                  props.setSelectedSemester({ id: box.id, titleKey: box.title })
                }
              >
                <Typography level="h4" sx={{ color: '#002E6D' }}>
                  {t(box.title)}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default SemesterOverviewComponent;
