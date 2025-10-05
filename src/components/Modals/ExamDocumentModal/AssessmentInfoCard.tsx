import { Box, Typography, Chip } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { Card } from '@agile-software/shared-components';

type Assessment = {
  assessmentTyp: string;
  weight: string;
  grade: string | 'N/A';
  date: string;
  requiresSubmission: boolean;
  examId?: string;
  deadline?: string;
};

interface AssessmentInfoCardProps {
  assessment: Assessment | null;
}

export const AssessmentInfoCard = ({ assessment }: AssessmentInfoCardProps) => {
  const { t } = useTranslation();

  if (!assessment) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const isDeadlinePassed = () => {
    if (!assessment.deadline) return false;
    return new Date() > new Date(assessment.deadline);
  };

  return (
    <Card
      cardSX={{ variant: 'soft', mb: 3 }}
    >
      <Box>
        <Typography
          level="title-lg"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          {t('components.dokumentModal.assessmentInfo.title')}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
            gap: 2,
          }}
        >
          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.type')}
            </Typography>
            <Typography level="title-md">
              {assessment.assessmentTyp}
            </Typography>
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.weight')}
            </Typography>
            <Typography level="title-md">
              {assessment.weight}
            </Typography>
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.grade')}
            </Typography>
            <Typography level="title-md">
              {assessment.grade}
            </Typography>
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.deadline')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="title-md">
                {assessment.deadline ? formatDate(assessment.deadline) : t('components.dokumentModal.assessmentInfo.noDeadline')}
              </Typography>
              {assessment.deadline && isDeadlinePassed() && (
                <Chip size="sm" color="danger" variant="solid">
                  Expired
                </Chip>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
