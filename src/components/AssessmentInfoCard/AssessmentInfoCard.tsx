import { Box, Typography, Chip } from '@mui/joy';
import { useTranslation } from 'react-i18next';
import { Card } from '@agile-software/shared-components';
import type { Assessment } from '@custom-types/assessment';

interface AssessmentInfoCardProps {
  assessment: Assessment | null;
}

const AssessmentInfoCard = ({ assessment }: AssessmentInfoCardProps) => {
  const { t } = useTranslation();

  if (!assessment) return null;

  const isDeadlinePassed = () => {
    if (!assessment.date) return false;
    return new Date() > new Date(assessment.date);
  };

  return (
    <Card cardSX={{ variant: 'soft', mb: 3 }}>
      <Box>
        <Typography level="title-lg" sx={{ fontWeight: 'bold', mb: 2 }}>
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
              {t(`examTypes.${assessment.assessmentTyp}`)}
            </Typography>
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.weight')}
            </Typography>
            <Typography level="title-md">{assessment.weight}</Typography>
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.grade')}
            </Typography>
            <Typography level="title-md">{assessment.grade}</Typography>
          </Box>

          <Box>
            <Typography level="body-sm" sx={{ color: 'neutral', mb: 0.5 }}>
              {t('components.dokumentModal.assessmentInfo.deadline')}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography level="title-md">
                {assessment.date
                  ? assessment.date
                  : t('components.dokumentModal.assessmentInfo.noDeadline')}
              </Typography>
              {assessment.date && isDeadlinePassed() && (
                <Chip size="sm" color="danger" variant="solid">
                  {t('components.dokumentModal.assessmentInfo.expired')}
                </Chip>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default AssessmentInfoCard;
