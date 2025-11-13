import { Box, Typography, IconButton } from '@mui/joy';
import { Accordion } from '@agile-software/shared-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useTranslation } from 'react-i18next';
import ModuleDetailView from './ModuleDetailView';
import { useEffect, useState } from 'react';
import type { Course } from '@custom-types/examData';
import type { Assessment } from '@custom-types/assessment';
import { useTypedSelector } from '@stores/rootReducer';

type Semester = {
  id: number | null;
  titleKey: string | null;
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

  const coursesState = useTypedSelector((state) => state.courses);
  const { courses } = coursesState.data;
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

  const calculateModuleGrade = (assessments: Assessment[]): string => {
    const assessmentsWithFeedback = assessments.filter(
      (a) => a.feedback?.grade !== undefined
    );

    // Only calculate weighted average if multiple exams with feedback exist and all have feedback
    if (
      assessments.length > 1 &&
      assessmentsWithFeedback.length === assessments.length
    ) {
      const totalWeight = assessments.reduce((sum, a) => {
        const weight = parseInt(a.weight) || 0;
        return sum + weight;
      }, 0);

      if (totalWeight === 0) return 'N/A';

      const weightedSum = assessments.reduce((sum, a) => {
        const weight = parseInt(a.weight) || 0;
        const grade = a.feedback?.grade || 0;
        return sum + grade * weight;
      }, 0);

      const avgGrade = weightedSum / totalWeight;
      return avgGrade.toFixed(1);
    }

    // If single exam or not all have feedback, use first available grade
    if (assessmentsWithFeedback.length > 0) {
      return assessmentsWithFeedback[0].feedback?.grade?.toString() || 'N/A';
    }

    return 'N/A';
  };

  useEffect(() => {
    const processCourses = (allCourses: Course[]) => {
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
          grade: exam.feedback?.grade?.toString() || 'N/A',
          date: formatDateTime(exam.examDate),
          requiresSubmission: exam.fileUploadRequired,
          room: exam.room,
          maxPoints: exam.maxPoints,
          duration: exam.duration,
          tools: exam.tools,
          feedback: exam.feedback,
        }));

        const moduleGrade = calculateModuleGrade(assessments);

        groupedBySemester[course.semester][course.courseCode] = {
          moduleInfo: {
            moduleName: course.courseName,
            moduleCode: course.courseCode,
            lecturer: course.lecturer,
            creditPoints: course.creditPoints,
            grade: moduleGrade,
          },
          assessments,
        };
      });

      setSemesterData(groupedBySemester);
    };

    if (courses.length > 0) {
      processCourses(courses);
    }
  }, [courses]);

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
