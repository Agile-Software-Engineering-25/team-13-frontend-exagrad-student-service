import { Box, Typography, IconButton } from '@mui/joy';
import { Accordion } from '@agile-software/shared-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';
import ModuleDetailView from './ModuleDetailView';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import type { CourseResponse } from '@/@custom-types/examData';
import useExamDataApi from '@/hooks/useExamDataApi';
import { useUser } from '@/hooks/useUser';
import { useTypedSelector } from '@stores/rootReducer';
import {
  setCourses,
  setLoading as setCoursesLoading,
  setError,
} from '@stores/slices/coursesSlice';

type Semester = {
  id: number | null;
  titleKey: string | null;
};

export type Assessment = {
  id: string;
  moduleCode: string;
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
  room?: string;
  maxPoints?: number;
  duration?: number;
  tools?: string[];
};

export type ModuleInfo = {
  moduleName: string;
  moduleCode: string;
  lecturer: string;
  creditPoints: number;
  grade: string | 'N/A';
};

export interface ModuleData {
  moduleInfo: ModuleInfo;
  assessments: Assessment[];
}

type SemesterData = Record<string, ModuleData>;

const ModuleOverviewComponent = (props: {
  selectedSemester: Semester;
  setSelectedSemester: React.Dispatch<React.SetStateAction<Semester>>;
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { getAllCourses } = useExamDataApi();
  const { getUserId } = useUser();

  const coursesState = useTypedSelector((state) => state.courses);
  const { courses, lastFetched } = coursesState.data;
  const loading = coursesState.state === 'loading';

  const [semesterData, setSemesterData] = useState<
    Record<number, SemesterData>
  >({});

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
    const studentId = getUserId();
    if (!studentId) {
      return;
    }

    // Check if we already have courses in Redux
    if (courses.length > 0 && lastFetched) {
      processCourses(courses);
      return;
    }

    const fetchCourses = async () => {
      try {
        dispatch(setCoursesLoading());
        const allCourses: CourseResponse[] = (await getAllCourses()) || [];

        if (!Array.isArray(allCourses)) {
          console.error('getAllCourses returned not an array:', allCourses);
          dispatch(setError('Invalid response format'));
          return;
        }

        dispatch(setCourses(allCourses));
        processCourses(allCourses);
      } catch (err) {
        console.error('Error fetching courses:', err);
        dispatch(
          setError(err instanceof Error ? err.message : 'Unknown error')
        );
      }
    };

    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserId(), courses.length]);

  const processCourses = (allCourses: CourseResponse[]) => {
    const groupedBySemester: Record<number, SemesterData> = {};

    allCourses.forEach((course) => {
      if (!groupedBySemester[course.semester]) {
        groupedBySemester[course.semester] = {};
      }

      const assessments: Assessment[] = course.exams.map((exam) => ({
        id: exam.id,
        moduleCode: exam.moduleCode,
        assessmentTyp: exam.examType,
        weight: `${exam.weightPerCent}%`,
        grade: 'N/A',
        date: formatDateTime(exam.examDate),
        requiresSubmission: exam.fileUploadRequired,
        room: exam.room,
        maxPoints: exam.maxPoints,
        duration: exam.duration,
        tools: exam.tools,
      }));

      groupedBySemester[course.semester][course.courseCode] = {
        moduleInfo: {
          moduleName: course.courseName,
          moduleCode: course.courseCode,
          lecturer: course.lecturer,
          creditPoints: course.creditPoints,
          grade: 'N/A',
        },
        assessments,
      };
    });

    setSemesterData(groupedBySemester);
  };

  const currentSemester = semesterData[props.selectedSemester.id ?? 0];

  // Show loading only if we're actually fetching and have no cached data
  if (loading && courses.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography level="body-md">
          {t('common.loading') || 'Loading...'}
        </Typography>
      </Box>
    );
  }

  // Don't show anything if we have courses but haven't processed them yet
  if (courses.length > 0 && Object.keys(semesterData).length === 0) {
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
        {/* Minimal loading placeholder */}
        <Box sx={{ mt: 2, opacity: 0.5 }}>
          <Typography level="body-sm" textAlign="center">
            {t('common.loading') || 'Loading...'}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Only show "no courses" if we have data loaded but nothing for this semester
  if (
    !loading &&
    courses.length > 0 &&
    Object.keys(semesterData).length > 0 &&
    (!currentSemester || Object.keys(currentSemester).length === 0)
  ) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography level="body-md">
          {t('components.moduleOverview.noCourses') ||
            'No courses available for this semester'}
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

