import { Box, Table, Button, Chip } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ExamDocumentModal from '@components/Modals/ExamDocumentModal/ExamDocumentModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import useExamDocumentsApi from '@hooks/useExamDocumentsApi';

type Assessment = {
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
  const [documentCounts, setDocumentCounts] = useState<Record<string, number>>({});

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

  return (
    <Box>
      <Table>
        <thead>
          <tr>
            <th>{t('components.moduleDetailView.table.assessment')}</th>
            <th>{t('components.moduleDetailView.table.weight')}</th>
            <th>{t('components.moduleDetailView.table.grade')}</th>
            <th>{t('components.moduleDetailView.table.date')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.selectedModuleData.assessments.map(
            (assessment: Assessment, idx: number) => (
              <tr key={idx}>
                <td>{assessment.assessmentTyp}</td>
                <td>{assessment.weight}</td>
                <td>{assessment.grade}</td>
                <td>{assessment.date}</td>
                <td>
                  {assessment.requiresSubmission && (
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
                          {t(
                            'components.moduleDetailView.table.uploaded',
                            'Hochgeladen'
                          )}
                        </Chip>
                      )}
                    </Box>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <ExamDocumentModal
        open={viewDocuments}
        setOpen={setViewDocuments}
        assessment={selectedAssessment}
      />
    </Box>
  );
};

export default AssessmentTable;
