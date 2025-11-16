import { Box, Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { StudentData } from '@/@custom-types/studentData';
import useCombinedStudentData from '@/hooks/useCombinedStudentData';
import useUser from '@/hooks/useUser';
import { useTypedSelector } from '@/stores/rootReducer';
import type { Course } from '@/@custom-types/examData';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

const StudentInfoHeader = () => {
  const { t, i18n } = useTranslation();
  const { fetchAndStoreCombinedData } = useCombinedStudentData();
  const { getUserId } = useUser();
  const courses = useTypedSelector((state) => state.courses.data.courses);

  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [ectsData, setEctsData] = useState<{
    reached: number;
    total: number;
  }>({ reached: 0, total: 0 });
  const [averageGrade, setAverageGrade] = useState<string>('N/A');

  // Calculate module grade (weighted by exam weight)
  const calculateModuleGrade = (course: Course): number | null => {
    const examsWithFeedback = course.exams.filter(
      (e) => e.feedback?.grade !== undefined
    );

    if (examsWithFeedback.length === 0) return null;

    if (
      course.exams.length > 1 &&
      examsWithFeedback.length === course.exams.length
    ) {
      const totalWeight = course.exams.reduce(
        (sum, e) => sum + e.weightPerCent,
        0
      );
      if (totalWeight === 0) return null;

      const weightedSum = course.exams.reduce((sum, e) => {
        const weight = e.weightPerCent || 0;
        const grade = e.feedback?.grade || 0;
        return sum + grade * weight;
      }, 0);

      return weightedSum / totalWeight;
    }

    return examsWithFeedback[0].feedback?.grade ?? null;
  };

  // Calculate ECTS and average grade
  const calculateMetrics = (courseList: Course[]) => {
    let totalEcts = 0;
    let reachedEcts = 0;
    const courseGrades: { grade: number; ects: number }[] = [];

    courseList.forEach((course) => {
      totalEcts += course.creditPoints;

      const moduleGrade = calculateModuleGrade(course);
      const allExamsHaveGrade =
        course.exams.length > 0 &&
        course.exams.every(
          (e) => e.feedback?.grade !== undefined && e.feedback.grade <= 4.0
        );

      if (allExamsHaveGrade && moduleGrade !== null) {
        reachedEcts += course.creditPoints;
        courseGrades.push({ grade: moduleGrade, ects: course.creditPoints });
      }
    });

    // Calculate ECTS-weighted average grade
    let avgGrade = 'N/A';
    if (courseGrades.length > 0) {
      const totalEctsForGrades = courseGrades.reduce(
        (sum, cg) => sum + cg.ects,
        0
      );
      const ectsWeightedSum = courseGrades.reduce(
        (sum, cg) => sum + cg.grade * cg.ects,
        0
      );
      const calculated = ectsWeightedSum / totalEctsForGrades;
      avgGrade = calculated.toFixed(1);
    }

    setEctsData({ reached: reachedEcts, total: totalEcts });
    setAverageGrade(avgGrade);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await fetchAndStoreCombinedData(getUserId());
        if (studentData) {
          setStudent(studentData);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchAndStoreCombinedData, getUserId]);

  useEffect(() => {
    if (courses.length > 0) {
      calculateMetrics(courses);
    }
  }, [courses]);

  const formatValue = (value: string | number | Date | undefined) => {
    if (value instanceof Date) {
      return value.toLocaleDateString(i18n.language, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return value ?? '-';
  };

  if (loading) {
    return (
      <LoadingSpinner
        message={t('components.studentInfoHeader.loading') + '...'}
      />
    );
  }

  if (!student) {
    return (
      <Typography level="body-md" sx={{ p: 2, color: '#00122B' }}>
        {t('components.studentInfoHeader.noDataAvailable')}
      </Typography>
    );
  }

  const headerProperties: {
    key: keyof StudentData | 'ectsCombined' | 'averageGrade';
    label: string;
  }[] = [
    { key: 'degreeProgram', label: 'degreeProgram' },
    { key: 'matriculationNumber', label: 'matriculationNumber' },
    { key: 'semester', label: 'semester' },
    { key: 'cohort', label: 'cohort' },
    { key: 'studyStatus', label: 'studyStatus' },
    { key: 'ectsCombined', label: 'ectsCombined' },
    { key: 'averageGrade', label: 'averageGrade' },
  ];

  /*const headerProperties = [
    'degreeProgram',
    'matriculationNumber',
    'creditPoints',  --> NOT IN STUDENT DATA API
    'start', --> NOT IN STUDENT DATA API
    'major',
    'year', --> NOT IN STUDENT DATA API
    'group', --> cohort
    'average', --> NOT IN STUDENT DATA API
    'end', --> NOT IN STUDENT DATA API
  ];*/

  return (
    <Box
      sx={{
        pl: { xs: 2, sm: 2, md: 3, xl: 4 },
        pr: { xs: 2, sm: 2, md: 3, xl: 4 },
        pb: { xs: 2, sm: 2, md: 3, xl: 4 },
        background: '#F3F8FF',
        borderRadius: 30,
      }}
    >
      <Typography level="h3" padding={2} sx={{ color: '#00122B' }}>
        {t('components.studentInfoHeader.title')}
      </Typography>

      <Grid
        container
        columns={{ xs: 3, sm: 8, md: 10 }}
        columnSpacing={{ xs: 2, sm: 2, md: 3, xl: 4 }}
        rowSpacing={2}
        sx={{ flexGrow: 1, justifyContent: 'flex-start' }}
      >
        {headerProperties.map(({ key, label }, index) => {
          let displayValue: string | number;

          if (key === 'ectsCombined') {
            displayValue = `${ectsData.reached} / ${ectsData.total}`;
          } else if (key === 'averageGrade') {
            displayValue = averageGrade;
          } else {
            displayValue = formatValue(student[key as keyof StudentData]);
          }

          return (
            <Grid
              xs={index === 0 ? 2 : 1}
              sm={index === 0 ? 4 : 2}
              md={index === 0 ? 4 : 2}
              key={index}
            >
              <Box
                sx={{
                  p: 1,
                  background: '#FFFFFF',
                  border: '2px solid #C2CAD5',
                  borderRadius: 14,
                  textAlign: 'center',
                }}
              >
                <Typography level="title-md" sx={{ color: '#00122B' }}>
                  {displayValue}
                </Typography>
                <Typography level="body-sm" sx={{ color: '#314055' }}>
                  {t(`components.studentInfoHeader.${label}`)}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default StudentInfoHeader;

