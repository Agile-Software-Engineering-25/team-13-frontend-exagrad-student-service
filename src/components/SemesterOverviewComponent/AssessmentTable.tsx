import { Box, Table, Button } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ExamDocumentModal from '@components/Modals/ExamDocumentModal/ExamDocumentModal';

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

  const handleOpenDocuments = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setViewDocuments(true);
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
                    <Button
                      size="sm"
                      variant="soft"
                      onClick={() => handleOpenDocuments(assessment)}
                    >
                      {t('components.moduleDetailView.table.submit')}
                    </Button>
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
