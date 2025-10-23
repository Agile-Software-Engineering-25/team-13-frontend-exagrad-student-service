import { Box, Button, Chip } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ExamDocumentModal from '@components/Modals/ExamDocumentModal/ExamDocumentModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useExamDocumentsApi from '@hooks/useExamDocumentsApi';
import { Table, createTableBuilder } from '@agile-software/shared-components';

//when trying check semester 4 first module first
// if something is checked in the front of the table everything gets checked for some reason

type Assessment = {
  id: string; // needed for DataItem for table component -> muss noch was geadded werden?
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

const AssessmentTable = (props: { selectedModuleData: ModuleData }) => {
  const { t } = useTranslation();
  const [viewDocuments, setViewDocuments] = useState(false);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment | null>(null);
  const [documentCounts, setDocumentCounts] = useState<Record<string, number>>(
    {}
  );

  const { getExamDocuments } = useExamDocumentsApi();

  // Fetch document counts for all exams in this module
  useEffect(() => {
    const fetchDocumentCounts = async () => {
      const examIds = props.selectedModuleData.assessments
        .filter((a) => a.requiresSubmission && a.examId)
        .map((a) => a.examId!);

      const counts: Record<string, number> = {};

      for (const examId of examIds) {
        try {
          const docs = await getExamDocuments({ examId });
          counts[examId] = docs?.length || 0;
        } catch (err) {
          console.error(`Failed to fetch documents for exam ${examId}:`, err);
          counts[examId] = 0;
        }
      }

      setDocumentCounts(counts);
    };

    fetchDocumentCounts();
  }, [props.selectedModuleData.assessments]);

  // Refetch document counts when modal closes
  useEffect(() => {
    if (!viewDocuments && selectedAssessment?.examId) {
      getExamDocuments({ examId: selectedAssessment.examId })
        .then((docs) => {
          setDocumentCounts((prev) => ({
            ...prev,
            [selectedAssessment.examId!]: docs?.length || 0,
          }));
        })
        .catch(() => {
          // Ignore errors
        });
    }
  }, [viewDocuments, selectedAssessment]);

  const handleOpenDocuments = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setViewDocuments(true);
  };

  const hasUploadedDocuments = (examId?: string) => {
    if (!examId) return false;
    return (documentCounts[examId] || 0) > 0;
  };

  // Table configuration using shared Table component
  const tableConfig = createTableBuilder<Assessment>()
    .addColumn(
      'assessmentTyp',
      t('components.moduleDetailView.table.assessment')
    )
    .addColumn('weight', t('components.moduleDetailView.table.weight'))
    .addColumn('grade', t('components.moduleDetailView.table.grade'))
    .addColumn('date', t('components.moduleDetailView.table.date'))
    .addColumn('actions', '', {
      render: (_value: any, assessment: Assessment) =>
        assessment.requiresSubmission ? (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Button
              size="sm"
              variant="soft"
              onClick={() => handleOpenDocuments(assessment)}
            >
              {t('components.moduleDetailView.table.submit')}
            </Button>
            {hasUploadedDocuments(assessment.examId) && (
              <Chip
                size="sm"
                color="success"
                startDecorator={<CheckCircleIcon />}
                variant="soft"
              >
                {t('components.moduleDetailView.table.uploaded')}
              </Chip>
            )}
          </Box>
        ) : null,
    })
    .build();

  return (
    <Box>
      <Table data={props.selectedModuleData.assessments} config={tableConfig} />

      <ExamDocumentModal
        open={viewDocuments}
        setOpen={setViewDocuments}
        assessment={selectedAssessment}
      />
    </Box>
  );
};

export default AssessmentTable;
