import { Box, Table, Button, Chip } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ExamDocumentModal from '@components/Modals/ExamDocumentModal/ExamDocumentModal';
import { useTypedSelector } from '@stores/rootReducer';
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

  const { documents } = useTypedSelector((state) => state.examDocuments.data);
  const { getExamDocuments } = useExamDocumentsApi();

  // Fetch documents for all exams in this module on mount
  useEffect(() => {
    const examIds = props.selectedModuleData.assessments
      .filter((a) => a.requiresSubmission && a.examId)
      .map((a) => a.examId!);

    // Fetch documents for each exam
    examIds.forEach((examId) => {
      getExamDocuments({ examId }).catch((err) => {
        console.error(`Failed to fetch documents for exam ${examId}:`, err);
      });
    });
  }, [props.selectedModuleData.assessments, getExamDocuments]);

  const handleOpenDocuments = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setViewDocuments(true);
  };

  const hasUploadedDocuments = (examId?: string) => {
    if (!examId) return false;
    return documents.some((doc) => doc.examId === examId);
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
